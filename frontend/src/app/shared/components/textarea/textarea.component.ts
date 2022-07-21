import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextareaComponent),
    },
  ],
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input()
  formConrol: AbstractControl | null | undefined;
  @Input()
  label = '';
  @Input()
  placeholder = '';
  @Input()
  type: string = '';
  @Input()
  messageErorFunc: any = () => {};

  _value = '';
  get value() {
    return this._value;
  }
  @Input()
  set value(val: string) {
    this._value = val;
    this.onChange(this._value);
  }
  onChange: any = () => {};
  onTouched: any = () => {};
  constructor() {}
  ngOnInit(): void {}
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onInput(e: any) {
    this.value = e.target.value;
  }
}
