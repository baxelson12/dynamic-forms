import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigBase } from '../../interfaces/Config-Base';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  exportAs: 'form',
})
export class FormComponent implements OnChanges, OnInit {
  private _config: ConfigBase<string>[] = [];
  heading: string;
  subheading: string;
  @Input() set config(val: any) {
    this.heading = val.heading;
    this.subheading = val.subheading;
    this._config = val.data;
  }
  get config() {
    return this._config;
  }

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get controls() {
    return this._config.filter(({ controlClass }) => controlClass !== 'button');
  }
  get changes() {
    return this.form.valueChanges;
  }
  get valid() {
    return this.form.valid;
  }
  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder, private fs: FormService) {}

  ngOnInit() {
    this.form = this.fs.toFormGroup(this.controls);
  }

  ngOnChanges() {
    // prettier-ignore
    if (!this.form) { return; }
    const controls = Object.keys(this.form.controls);
    const configControls = this.controls.map((item) => item.key);
    this.addOrRemoveControls(controls, configControls);
  }

  private addOrRemoveControls(
    formControls: string[],
    configControls: string[]
  ) {
    formControls
      .filter((control) => !configControls.includes(control))
      .forEach((control) => this.form.removeControl(control));

    configControls
      .filter((control) => !formControls.includes(control))
      .forEach((key) => {
        const config = this._config.find((control) => control.key === key);
        this.form.addControl(key, this.fs.toControl(config));
      });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(key: string, disable: boolean) {
    if (this.form.controls[key]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[key][method]();
      return;
    }

    this._config = this._config.map((item) => {
      if (item.key === key) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(key: string, value: any) {
    this.form.controls[key].setValue(value, { emitEvent: true });
  }
}
