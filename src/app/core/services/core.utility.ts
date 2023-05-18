import { ChangeDetectorRef, Injectable } from '@angular/core';
import * as moment from 'moment';
import { CoreService } from '../core.service';
import * as mime from 'mime';

@Injectable({
  providedIn: 'root',
})
export class CoreUtilityService {
  constructor(private coreService: CoreService) {}

  public dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    const byteString = atob(dataURI.split(',')[1]);

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const bb = new Blob([ab]);
    return bb;
  }

  public ionRefresherScroll(ionRefresher: any, scrollTop: number) {
    ionRefresher.disabled = scrollTop > 0;
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public copyToClipboard(text: string) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

  public getDateOutput(date: any, format: string) {
    // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    return moment(date).format(format);
  }

  public validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public validateSpacialCharacter(text: string) {
    const re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    return re.test(String(text).toLowerCase());
  }

  public randomNumber(length: number) {
    return Math.floor(Math.random() * length);
  }

  public insertAndShift(arr: number[], to: number, from: number) {
    let newArray: number[] = [];
    const fromItem = arr[from];
    if (from > to) {
      const startToTo = to > 0 ? arr.slice(0, to) : [];
      const toToFrom = arr.slice(to, from);
      const fromToEnd = arr.slice(from + 1, arr.length);
      newArray = newArray.concat(startToTo, [fromItem], toToFrom, fromToEnd);
    }
    if (to > from) {
      const startToFrom = from > 0 ? arr.slice(0, from) : [];
      const fromToTo = arr.slice(from + 1, to + 1);
      const toToEnd = arr.slice(to + 1, arr.length);
      newArray = newArray.concat(startToFrom, fromToTo, fromItem, toToEnd);
    }
    return newArray;
  }

  public getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    let unit = 'K';
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

  public isValidPhoneNumber(number: any) {
    let re = /^[0-9]{10}$/;
    if (!re.test(number)) {
      return false;
    }
    return true;
  }

  public async getFileFromUrl(url: string) {
    try {
      const resp = await fetch(url);
      // debugger;
      let type = resp.headers.get('content-type');
      if (!type) {
        // let extension = url.substring(url.lastIndexOf('.') + 1);
        // type = mime.getType(extension);
        return null;
      }
      const blob = await resp.blob();
      const file = new File([blob], '', {
        type: type || '',
      });
      return file;
    } catch (error) {
      return null;
    }
  }

  public getVideoCover(
    data: { file?: any; url?: string } = { file: null, url: '' },
    seekTo = 0.0
  ) {
    return new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = document.createElement('video');
      const src = data.url || (data.file ? URL.createObjectURL(data.file) : '');
      videoPlayer.setAttribute('src', src);
      videoPlayer.setAttribute('crossorigin', 'anonymous');
      videoPlayer.load();
      videoPlayer.addEventListener('error', (ex) => {
        reject('error when loading video file');
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener('loadedmetadata', () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          reject('video is too short.');
          return;
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          if (seekTo > 0) {
            videoPlayer.currentTime = seekTo;
          } else {
            videoPlayer.currentTime = videoPlayer.duration / 2;
          }
        }, 200);
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener('seeked', () => {
          // define a canvas to have the same dimension as the video
          const canvas = document.createElement('canvas');
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;
          // draw the video frame to canvas
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
          // return the canvas image as a blob
          // ctx.canvas.toBlob(
          //   (blob) => {
          //     console.log(blob);
          //   },
          //   'image/jpeg',
          //   1 /* quality */
          // );
          resolve(ctx.canvas.toDataURL('image/png'));
        });
      });
    });
  }

  public getDocPreview(link: string) {
    //docx,doc,xlsx,xls,pptx,ppt,pdf
    var ext = this.coreService.services.utility.getUrlExtension(link);
    if (ext.includes('pdf')) return './assets/images/svg/files/new/pdf.svg';
    if (ext.includes('xls')) return './assets/images/svg/files/new/xls.svg';
    if (ext.includes('ppt')) return './assets/images/svg/files/new/ppt.svg';
    if (ext.includes('doc')) return './assets/images/svg/files/new/doc.svg';
    return './assets/images/fileimage.png';
  }

  public RGBAToHexA(r: any, g: any, b: any, a: any) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    if (a.length == 1) a = '0' + a;

    return '#' + r + g + b + a;
  }

  public getUrlExtension(url: string) {
    var text1 = url.split(/[#?]/)[0];
    if (!text1) return '';
    var text2 = text1.split('.');
    if (!text2) return '';
    var text3 = text2.pop();
    if (!text3) return '';
    return text3.trim().toLowerCase();
  }

  public getMonthName(month: number) {
    var monthName = '';
    switch (month) {
      case 0:
        monthName = 'มกราคม';
        break;
      case 1:
        monthName = 'กุมภาพันธ์';
        break;
      case 2:
        monthName = 'มีนาคม';
        break;
      case 3:
        monthName = 'เมษายน';
        break;
      case 4:
        monthName = 'พฤษภาคม';
        break;
      case 5:
        monthName = 'มิถุนายน';
        break;
      case 6:
        monthName = 'กรกฎาคม';
        break;
      case 7:
        monthName = 'สิงหาคม';
        break;
      case 8:
        monthName = 'กันยายน';
        break;
      case 9:
        monthName = 'ตุลาคม';
        break;
      case 10:
        monthName = 'พฤศจิกายน';
        break;
      case 11:
        monthName = 'ธันวาคม';
        break;
      default:
      // code block
    }
    return monthName;
  }

  public getDayList(date: Date) {
    const days = [
      'อาทิตย์',
      'จันทร์',
      'อังคาร',
      'พุธ',
      'พฤหัสบดี',
      'ศุกร์',
      'เสาร์',
    ];
    var res: any[] = [];
    var month = date.getMonth();
    var year = date.getFullYear();
    var lastDay = new Date(year, month + 1, 0).getDate();

    for (let index = 1; index <= lastDay; index++) {
      const day = new Date(year, month, index).getDay();
      res.push({
        day: days[day],
        date: String(index).padStart(2, '0'),
      });
    }

    return res;
  }

  public formatPrice(price: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(price)
  }
}
