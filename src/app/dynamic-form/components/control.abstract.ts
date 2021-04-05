import { FormGroup } from '@angular/forms';
import { ConfigBase } from '../interfaces/Config-Base';
import { FieldBase } from '../interfaces/Field-Base';

export abstract class Control implements FieldBase {
  set data(val: {}) {
    Object.assign(this, val);
  }
  config: ConfigBase<string>;
  group: FormGroup;
}
