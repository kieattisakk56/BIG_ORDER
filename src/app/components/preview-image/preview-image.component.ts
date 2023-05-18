import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Gallery, GalleryRef, ImageItem, YoutubeItem } from 'ng-gallery';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: false, noPause: true, showIndicators: true },
    },
  ],
})
export class PreviewImageComponent implements OnInit {
  @Input() images: any[] = [];
  @Input() index = 0;
  @Input() onClose = () => {};

  id = 'preview-gallery';

  constructor(private sanitizer: DomSanitizer, private gallery: Gallery) {}

  ngOnInit(): void {
    const galleryRef: GalleryRef = this.gallery.ref(this.id);
    this.images.forEach((e) => {
      galleryRef.addImage({
        src: e.src,
        thumb: e.src,
      });
    });
    galleryRef.set(this.index);
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getTrustUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  change() {
    var ele = document.getElementsByTagName('video');
    for (var i = 0; i < ele.length; i++) {
      ele[i].pause();
    }
    var ele2 = document.getElementsByTagName('audio');
    for (var i = 0; i < ele2.length; i++) {
      ele2[i].pause();
    }
  }
}
