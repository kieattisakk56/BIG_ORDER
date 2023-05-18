import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-formly-field-drag-ndrop',
  templateUrl: './formly-field-drag-ndrop.component.html',
  styleUrls: ['./formly-field-drag-ndrop.component.scss'],
})
export class FormlyFieldDragNDropComponent extends FieldType<FieldTypeConfig> {
  data: any[] = [];
  opts: any[] = [];
  selectedItem: any[] = [];
  value: any;
  checked = false;
  indeterminated = false;
  constOpt: any[] = [];

  draggable = false;

  guid = UUID.UUID();

  optsSearch = '';
  selectedSearch = '';

  movingItems: any[] = [];

  clickedList: {
    selectedOpts: any[];
    selectedItems: any[];
  } = { selectedOpts: [], selectedItems: [] };

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  async ngOnInit() {
    if (this.to['optionsAsync']) {
      const data = await this.to['optionsAsync']();
      this.opts = data;
    } else if (this.to['options']) {
      this.opts = [];
      this.to['options']?.forEach((element) => {
        this.opts.push(element);
      });
    }

    if (this.formControl.value) {
      this.value = this.formControl.value;
      if (this.opts.length == 0) {
        this.value.forEach((e: any) => {
          if (!this.opts.find((x) => x.id == e))
            this.opts.push({
              id: e,
              name: e,
              disabled: false,
            });
        });
      }

      this.constOpt = structuredClone(this.opts);

      this.selectedItem = this.value.map((e: any) =>
        this.opts.find((d) => d.id == e.id)
      );

      this.opts = this.opts.filter(
        (e: any) => !this.selectedItem.find((d) => d.id == e.id)
      );
    }
    this.check();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      //move in same box
      // let currentIndex = event.currentIndex;
      // let previousIndex = 0;
      // this.movingItems.forEach((e: any, i: number) => {
      //   previousIndex = event.container.data.findIndex(
      //     (d: any) => d.id == e.id
      //   );
      //   moveItemInArray(
      //     event.container.data,
      //     previousIndex,
      //     currentIndex
      //   );
      //   currentIndex += 1;
      //   console.log(`previous ${previousIndex}`);
      //   console.log(`current ${currentIndex}`);
      //   console.log(`///////////////////`);
      // });
      // // event.container.data = event.container.data.filter(
      // //   (e) => !this.movingItems.includes(e)
      // // );
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //move to other box
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.formControl.setValue(
      this.selectedItem.map((e) => {
        return { id: e.id, name: e.name };
      })
    );
    this.check();
    this.movingItems = [];
  }

  onStartDrag(item: any) {
    if (this.clickedList.selectedOpts.includes(item)) {
      this.movingItems = structuredClone(this.clickedList.selectedOpts);
    } else if (this.clickedList.selectedItems.includes(item)) {
      this.movingItems = structuredClone(this.clickedList.selectedItems);
    } else {
      this.movingItems.push(item);
    }
  }

  displayHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  checkboxCheck() {
    this.checked = !this.checked;
    if (this.checked) {
      this.selectedItem = structuredClone(this.constOpt);
      this.opts = [];
    } else {
      this.opts = structuredClone(this.constOpt);
      this.selectedItem = [];
    }
    this.indeterminated = false;
    this.formControl.setValue(
      this.selectedItem.map((e) => {
        return { id: e.id, name: e.name };
      })
    );
  }

  check() {
    this.checked = this.selectedItem.length == this.constOpt.length;
    this.indeterminated =
      this.selectedItem.length > 0 &&
      this.selectedItem.length != this.constOpt.length;
  }

  selectItem(item: any, type: string) {
    if (type == 'opts') {
      if (this.clickedList.selectedOpts.includes(item)) {
        this.clickedList.selectedOpts = this.clickedList.selectedOpts.filter(
          (e) => e.id != item.id
        );
      } else {
        this.clickedList.selectedOpts.push(item);
      }
    } else {
      if (this.clickedList.selectedItems.includes(item)) {
        this.clickedList.selectedItems = this.clickedList.selectedItems.filter(
          (e) => e.id != item.id
        );
      } else {
        this.clickedList.selectedItems.push(item);
      }
    }
  }

  move(type: string) {
    if (type == 'opts') {
      this.opts = this.opts.filter(
        (e) => !this.clickedList.selectedOpts.includes(e)
      );
      this.selectedItem = [
        ...this.selectedItem,
        ...this.clickedList.selectedOpts,
      ];
      this.clickedList.selectedOpts = [];
    } else {
      this.selectedItem = this.selectedItem.filter(
        (e) => !this.clickedList.selectedItems.includes(e)
      );
      this.opts = [...this.opts, ...this.clickedList.selectedItems];
      this.clickedList.selectedItems = [];
    }
    this.formControl.setValue(
      this.selectedItem.map((e) => {
        return { id: e.id, name: e.name };
      })
    );
    this.check();
  }
}
