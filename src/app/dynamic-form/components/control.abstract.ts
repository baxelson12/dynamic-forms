import { HostBinding } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ConfigBase } from '../interfaces/Config-Base';
import { FieldBase } from '../interfaces/Field-Base';

export abstract class Control implements FieldBase {
  config: ConfigBase<string>;
  group: FormGroup;
}
