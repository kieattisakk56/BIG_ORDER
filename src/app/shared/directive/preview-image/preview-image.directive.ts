import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PreviewImageComponent } from 'src/app/components/preview-image/preview-image.component';

@Directive({
  selector: '[appPreviewImage]',
})
export class PreviewImageDirective {
  @Input() appPreviewImage = '';
  className = '';
  @ViewChild('appenHere') target = null;
  images: any = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {
    this.className = 'previewImage-' + this.appPreviewImage;
    this.renderer.addClass(this.el.nativeElement, 'previewImage');
    this.renderer.addClass(this.el.nativeElement, this.className);
  }

  // @HostListener('mouseenter') onMouseEnter() {}

  // @HostListener('mouseleave') onMouseLeave() {}

  @HostListener('click') onMouseClick() {
    this.appendComponentToBody(PreviewImageComponent);
  }

  appendComponentToBody(component: any) {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    const prop: any = componentRef.instance;

    this.images = document.querySelectorAll('.' + this.className);
    this.images.forEach((element: any, i: any) => {
      if (element === this.el.nativeElement) {
        prop.index = i;
      }
      if (!element.type){
        element.type = element.attributes.type.value
      }
      if (!element.src){
        element.src = element.attributes.src.value
      }
    });
    prop.images = this.images;
    prop.onClose = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    // 5. Wait some time and remove it from the component tree and from the DOM
    // setTimeout(() => {
    //   this.appRef.detachView(componentRef.hostView);
    //   componentRef.destroy();
    // }, 3000);
  }
}
