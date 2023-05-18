import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatabletypePipe } from './datatabletype/datatabletype.pipe';
import { MomentPipe } from './moment/moment.pipe';
import { HighlightPipe } from './highlight/highlight.pipe';

@NgModule({
  declarations: [DatatabletypePipe, MomentPipe, HighlightPipe],
  imports: [CommonModule],
  exports: [DatatabletypePipe, MomentPipe, HighlightPipe],
})
export class PipeModule { }
