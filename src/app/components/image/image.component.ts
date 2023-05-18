import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() id!: string;
  @Input() src!: string;
  @Input() class: string | undefined;
  @Input() width: number | undefined;
  @Input() height: number | undefined;

  @Input() defualtImage!: string | undefined;
  @Input() index = 0;
  @Input() onClose = () => { };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  getSafeUrl(url: string) {
    return url;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
