import { ValidatorFn, Validators } from '@angular/forms';

export interface ConfigBase<T> {
  // Value of field
  value?: T;
  // Possible addtl inputs
  data?: any;
  // Key of field
  key: string;
  // Label of field
  label?: string;
  // Placeholder of field
  placeholder?: string;
  // Is field required
  required?: boolean;
  // Is field disabled
  disabled: boolean;
  // Class of field
  controlClass: string;
  // type of field e.g text,email,password
  inputType?: string;
  // Options for radio, select
  options?: { key: string; value: string }[];
  // Validators of field
  validators?: (Validators | ValidatorFn)[];
}
