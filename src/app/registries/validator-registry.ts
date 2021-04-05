import { Validators } from '@angular/forms';

export const ValidatorRegistry = {
  required: () => Validators.required,
  minLength: (len: number) => Validators.minLength(len),
};
