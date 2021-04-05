import { FormGroup } from '@angular/forms';
import { ConfigBase } from './Config-Base';

export interface ControlBase {
  config: ConfigBase<string>;
  group: FormGroup;
}
