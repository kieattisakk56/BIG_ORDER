import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appJsonRendering]'
})
export class JsonRenderingDirective {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  console.log(this.elementRef.nativeElement);
  }
}
