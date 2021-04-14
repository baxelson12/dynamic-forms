import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { ModifiedFormControl } from './formControl';

export class ModifiedFormGroup extends FormGroup {
  id;
  get parsedValue(): Object {
    return Object.keys(this.controls).reduce((acc, curr) => {
      const control = this.controls[curr] as
        | ModifiedFormControl
        | ModifiedFormGroup;
      return { ...acc, [control.id]: control.parsedValue };
    }, {});
  }

  constructor(
    controls: {
      [key: string]: AbstractControl;
    },
    id: string,
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    super(controls, validatorOrOpts, asyncValidator);
    this.id = id;
  }
}
