import { FormGroup } from '@angular/forms';
import { ModifiedFormControl } from './formControl';

export class ModifiedFormGroup extends FormGroup {
  get parsedObject(): Object {
    return Object.keys(this.controls).reduce((acc, curr) => {
      const control = this.controls[curr] as ModifiedFormControl;
      return { ...acc, [control.id]: control.parsedValue };
    }, {});
  }
}
