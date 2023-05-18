import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  forwardRef,
  Input,
  OnInit,
  HostBinding,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';

@Directive({
  selector: '[contenteditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableFormDirective),
      multi: true,
    },
  ],
})
export class ContentEditableFormDirective implements ControlValueAccessor {
  @Input() textLimit: number = 0;
  @HostBinding('attr.contenteditable') enabled = true;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  private removeDisabledState!: () => void;

  private id = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.id = this.elementRef.nativeElement.id;
  }

  @HostListener('keydown', ['$event']) Keydown(event: any): void {
    const length = this.elementRef.nativeElement.textContent.length;
    if (length >= this.textLimit && this.textLimit > 0) {
      if (event.key != 'Backspace') event.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onInput(event: any): void {
    this.onChange(this.elementRef.nativeElement.innerHTML);
  }

  @HostListener('blur') onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      value || ''
    );
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.enabled = !disabled;
  }
}
