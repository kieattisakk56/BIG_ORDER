import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  @Input() title?: string | null = '';
  @Input() isOpen: boolean = false;
  @Input() model: any = {};
  @Input() fields: FormlyFieldConfig[] = [];
  @Output() OnSubmit = new EventEmitter<{ value: any; form: FormGroup }>();

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  isSearchable = false;

  constructor() { }

  ngOnInit(): void {

   
    
    setTimeout(() => {
      this.isSearchable =
      Object.keys(this.model).length > 0 && this.fields.length > 0;
    }, 0); 
  }

  onSubmit(value: any) {

    this.OnSubmit.emit({ value: value, form: this.form });
  }

  discard() {
    this.options.resetModel && this.options.resetModel();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  alert() {
    alert('test');
  }
}
