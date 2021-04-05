import { Injectable } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { ConfigBase } from '../../interfaces/Config-Base';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  toControl(config: ConfigBase<string>) {
    const { disabled, validators, value } = config;
    return this.fb.control({ disabled, value }, validators as ValidatorFn[]);
  }

  toFormGroup(controls: ConfigBase<string>[]) {
    const group = this.fb.group({});
    controls.forEach((control) =>
      group.addControl(control.key, this.toControl(control))
    );
    return group;
  }
}
