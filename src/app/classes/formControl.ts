import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

export class ModifiedFormControl extends FormControl {
  id: string;
  get parsedValue(): Object {
    return { id: this.id, value: this.value };
  }

  constructor(
    formState: any = null,
    id: string,
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    super(formState, validatorOrOpts, asyncValidator);
    this.id = id;
  }
}
