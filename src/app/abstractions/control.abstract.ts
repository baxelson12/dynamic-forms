import { FormGroup } from '@angular/forms';
import { ConfigBase } from '../interfaces/Config-Base';
import { ControlBase } from '../interfaces/Control-Base';

export abstract class Control implements ControlBase {
  config: ConfigBase<string>;
  group: FormGroup;
}
