import { Injectable } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { ModifiedFormControl } from '../../classes/formControl';
import { ModifiedFormGroup } from '../../classes/formGroup';
import { ConfigBase } from '../../interfaces/Config-Base';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  toControl(config: ConfigBase<string>) {
    const { disabled, validators, value, key } = config;
    const control = new ModifiedFormControl(
      { disabled, value },
      key, // id
      validators as ValidatorFn[]
    );
    return control;
    // return this.fb.control({ disabled, value }, validators as ValidatorFn[]);
  }

  toFormGroup(controls: ConfigBase<string>[]) {
    const group = new ModifiedFormGroup({});
    controls.forEach((control) => {
      if (control.controlClass === 'formGroup') {
        group.addControl(control.key, this.toFormGroup(control.data));
        return;
      } else {
        group.addControl(control.key, this.toControl(control));
      }
    });
    return group;
  }
}
