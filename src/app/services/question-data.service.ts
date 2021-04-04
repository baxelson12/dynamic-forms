import { Injectable } from '@angular/core';
import { delay, map, mergeMap, toArray } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConfigBase } from '../dynamic-form/interfaces/Config-Base';
import { ConfigDTO } from '../dynamic-form/interfaces/Config-DTO';
import { ValidatorFn, Validators } from '@angular/forms';

const DATA: ConfigDTO<string>[] = [
  {
    key: 'firstName',
    label: 'First Name',
    placeholder: 'John',
    required: false,
    disabled: false,
    controlClass: 'default',
    inputType: 'text',
    validators: { required: '' },
  },
  {
    key: 'middleName',
    label: 'Middle Name',
    placeholder: 'Cornelius',
    required: false,
    disabled: false,
    controlClass: 'default',
    inputType: 'text',
    validators: { required: '', minLength: 3 },
  },
  {
    key: 'lastName',
    label: 'Last Name',
    placeholder: 'Doe',
    required: false,
    disabled: false,
    controlClass: 'default',
    inputType: 'text',
  },
  {
    key: 'ssn',
    label: 'Social Security Number',
    placeholder: '111-11-1111',
    required: false,
    disabled: false,
    controlClass: 'default',
    inputType: 'password',
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    placeholder: '10/20/1929',
    required: false,
    disabled: false,
    controlClass: 'default',
    inputType: 'date',
  },
  {
    key: 'favoriteFood',
    label: 'Favorite Food',
    required: false,
    disabled: false,
    controlClass: 'select',
    options: [
      {
        key: 'pizza',
        value: 'Pizza',
      },
      {
        key: 'pasta',
        value: 'Pasta',
      },
      {
        key: 'steak',
        value: 'Steak',
      },
    ],
  },
  {
    key: 'submit',
    label: 'Save',
    controlClass: 'button',
    disabled: false,
    required: false,
  },
];

const VALIDATOR_MAP = {
  required: () => Validators.required,
  minLength: (len: number) => Validators.minLength(len),
};
const convertControlValidators = (validators: {
  [key: string]: string | number;
}) => {
  return Object.keys(validators).map((validator) => {
    if (validators[validator] === '') {
      return VALIDATOR_MAP[validator]();
    } else {
      return VALIDATOR_MAP[validator](validators[validator]);
    }
  }) as (ValidatorFn | Validators)[];
};

@Injectable()
export class QuestionDataService {
  // Get api data
  get(): Observable<ConfigDTO<string>[]> {
    return of(DATA).pipe(delay(1000));
  }

  // Get api data with validator functions
  getConverted(): Observable<ConfigBase<string>[]> {
    return this.get().pipe(
      mergeMap((_) => _),
      map((config) => ({
        ...config,
        validators: config.validators
          ? convertControlValidators(config.validators)
          : [],
      })),
      toArray()
    );
  }
}
