import { FormGroup } from '@angular/forms';
import { ConfigBase } from './Config-Base';

export interface FieldBase {
  config: ConfigBase<string>;
  group: FormGroup;
}
