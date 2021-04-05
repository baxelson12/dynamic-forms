import {
  Compiler,
  ComponentFactory,
  Inject,
  Injectable,
  Injector,
  NgModuleFactory,
} from '@angular/core';
import { from, Observable } from 'rxjs';
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

  load(moduleKey: string): Observable<ComponentFactory<unknown>> {
    const promise = this.dynamicModules[moduleKey]()
      .then((moduleOrFactory) =>
        this.compiler.compileModuleAsync(moduleOrFactory)
      )
      .then((factory: NgModuleFactory<any>) => {
        const lazyModuleRef = factory.create(this.injector);
        // const componentType: Type<any> = lazyModuleRef.instance.entryComponentsType;
        const comp = lazyModuleRef.injector.get(DYNAMIC_INPUT);
        const fact = lazyModuleRef.componentFactoryResolver.resolveComponentFactory<unknown>(
          comp
        );
        return fact;
      });

    return from(promise);
  }
}
