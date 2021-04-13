import {
  Compiler,
  ComponentFactory,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/r3_symbols';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DYNAMIC_INPUT } from '../../tokens/dynamic-input.token';
import {
  DYNAMIC_MODULES,
  DynamicModulesMap,
} from '../../tokens/dynamic-modules.token';

@Injectable()
export class GeneratorService {
  constructor(
    @Inject(DYNAMIC_MODULES) private dynamicModules: DynamicModulesMap,
    private compiler: Compiler,
    private injector: Injector
  ) {}

  /**
   * Dynamically loads a component
   * @param moduleKey Key defined in DynamicModulesMap
   */
  load(moduleKey: string): Observable<ComponentFactory<unknown>> {
    this._checkSupportedTypes(this.dynamicModules, moduleKey);
    return from(this.dynamicModules[moduleKey]()).pipe(
      map(this._returnModule),
      switchMap((r) => this._promiseToObservable(this.compiler, r)),
      map((factory) => this._createComponentFactory(this.injector, factory)),
      catchError((e) => {
        console.warn('Generic module load error', e);
        return EMPTY;
      })
    );
  }

  /**
   * Grabs the module from the import
   * @param module The (unloaded) module to be compiled
   */
  private _returnModule(module: Object): Type<unknown> {
    const key = Object.keys(module)[0];
    return module[key] as Type<unknown>;
  }

  /**
   * Compiles a module async
   * @param compiler Compiler injected in ctor
   * @param module Module to be compiled
   */
  private _promiseToObservable(
    compiler: Compiler,
    module: Type<unknown>
  ): Observable<NgModuleFactory<unknown>> {
    return from(compiler.compileModuleAsync(module));
  }

  /**
   * Creates a component factory
   * @param injector Injector injected in ctor
   * @param moduleFactory Module factory to be used for component instantiation
   */
  private _createComponentFactory(
    injector: Injector,
    moduleFactory: NgModuleFactory<unknown>
  ): ComponentFactory<unknown> {
    const ref = moduleFactory.create(injector);
    const component: Type<unknown> = ref.injector.get(DYNAMIC_INPUT);
    try {
      return ref.componentFactoryResolver.resolveComponentFactory<unknown>(
        component
      );
    } catch (e) {
      // In the event of an invalid token
      console.error(
        `Could not resolve dynamic token.  Verify the value and try again.`,
        e
      );
    }
  }

  private _checkSupportedTypes(possibleTypes, type): void {
    try {
      possibleTypes[type];
    } catch (e) {
      const supportedTypes = Object.keys(possibleTypes).join(', ');
      console.warn(
        `Trying to use an unsupported type (${type}). Supported types: ${supportedTypes}`
      );
    }
  }
}
