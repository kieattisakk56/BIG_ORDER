import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewImageDirective } from './preview-image/preview-image.directive';
import { CountUpDirective } from './count-up/count-up.directive';
import { ContentEditableFormDirective } from './content-editable/content-editable.directive';
import { JsonRenderingDirective } from './json-rendering/json-rendering.directive';
import { HasPermissionDirective } from './has-permission/has-permission.directive';


@NgModule({
  declarations: [PreviewImageDirective, CountUpDirective, ContentEditableFormDirective, JsonRenderingDirective, HasPermissionDirective],
  imports: [CommonModule],
  exports: [PreviewImageDirective, CountUpDirective, ContentEditableFormDirective, JsonRenderingDirective, HasPermissionDirective],
})
export class DirectiveModule { }
