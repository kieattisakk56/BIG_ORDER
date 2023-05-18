import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { NavbarMenu } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-import-btn',
  templateUrl: './import-btn.component.html',
  styleUrls: ['./import-btn.component.scss'],
})
export class ImportBtnComponent implements OnInit {
  @Input() className: string = '';
  @Input() accept: string = '*';
  @Input() html: string = '';
  @Output() onSelect = new EventEmitter<any>();

  id = UUID.UUID();

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    const files = event.target.files;
    this.onSelect.emit(files);
    event.target.value = '';
  }
}
