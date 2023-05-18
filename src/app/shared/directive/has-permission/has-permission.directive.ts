import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[HasPermission]'
})
export class HasPermissionDirective {
  @Input() appHasPermission: string | any;
  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {

  }

  ngOnInit() {
    // if (this.authService.hasPermission(this.appHasPermission)) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    // } else {
    //   this.viewContainer.clear();
    // }
  }
}
