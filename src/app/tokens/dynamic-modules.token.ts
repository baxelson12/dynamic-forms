import { InjectionToken, Type } from '@angular/core';

export const DYNAMIC_MODULES = new InjectionToken<DynamicModulesMap>(
  'DYNAMIC_MODULES'
);

export interface DynamicModulesMap {
  [key: string]: () => Promise<unknown>;
}
