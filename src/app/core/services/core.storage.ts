import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CoreStorageService {
  secureKey = 'app';
  storageName = 'app';
  appKey: any = '';
  constructor() {
    setTimeout(() => {
      this.appKey = this.decrypt(environment.api_service.domain + this.storageName + '/');
    }, 300);
  }

  async getItem(key: string) {
    return JSON.parse(
      this.decrypt(window.localStorage.getItem(this.appKey + key)) ?? 'null'
    );
  }

  async setItem(key: string, value: any) {
    window.localStorage.setItem(
      this.appKey + key,
      this.encrypt(JSON.stringify(value))
    );
    return this.appKey + key, this.encrypt(JSON.stringify(value));
  }


  async removeItem(key: string) {
    window.localStorage.removeItem(this.appKey + key);
  }

  async clear() {
    window.localStorage.clear();
  }

  encrypt(value: any) {
    return CryptoJS.AES.encrypt(value, this.secureKey).toString();
  }

  decrypt(value: any) {
    return value
      ? CryptoJS.AES.decrypt(value, this.secureKey).toString(CryptoJS.enc.Utf8)
      : null;
    //return value;
  }

  encryption(str: any) {
    const key = CryptoJS.enc.Utf8.parse('app');
    const iv = CryptoJS.enc.Utf8.parse('app');
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
  async setIdentity(data: any) {
    await this.setItem('identity', data);
  }
  async getIdentity() {
    return await this.getItem('identity');
  }
  async resetIdentity() {
    await this.removeItem('identity');
  }

  async setUser(data: any) {
    await this.setItem('user', data);
  }
  async getUser() {
    return await this.getItem('user');
  }
  async resetUser() {
    await this.removeItem('user');
  }

  async setMenu(data: any) {
    await this.setItem('menu', data);
  }
  async getMenu() {
    return await this.getItem('menu');
  }

  async setTimeQuery(key: string) {

    return await this.setItem(key + '_time', (new Date()).toString());
  }

  async getTimeQuery(key: string) {

    var startTime = await this.getItem(key + '_time');
    var current = moment(new Date())
    var duration = moment.duration(current.diff(startTime));
    var diff = duration.asSeconds();
    if (diff < 15) {
      return await this.getItem(key);
    } else {
      await this.setTimeQuery(key);
      return null;
    }
 
  }
}
