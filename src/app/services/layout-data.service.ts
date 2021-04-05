import { Injectable } from '@angular/core';
import { delay, map, mergeMap, toArray } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConfigBase } from '../interfaces/Config-Base';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorRegistry } from '../registries/validator-registry';
import { LayoutData } from '../data/layout-data';

const convertControlValidators = (validators: {
  [key: string]: string | number;
}) => {
  return Object.keys(validators).map((validator) => {
    if (validators[validator] === '') {
      return ValidatorRegistry[validator]();
    } else {
      return ValidatorRegistry[validator](validators[validator]);
    }
  }) as (ValidatorFn | Validators)[];
};

@Injectable()
export class LayoutDataService {
  // Get api data
  get(): Observable<any[]> {
    return of(LayoutData).pipe(delay(1000));
  }

  // Get api data with validator functions
  getConverted(): Observable<ConfigBase<string>[]> {
    return this.get().pipe(
      mergeMap((_) => _),
      map((top) => {
        const controls = top.data.map((control) => ({
          ...control,
          validators: control.validators
            ? convertControlValidators(control.validators)
            : [],
        }));
        return { ...top, data: controls };
      }),
      toArray()
    );
  }
}
