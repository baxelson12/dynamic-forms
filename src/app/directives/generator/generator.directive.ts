import {
  ComponentFactory,
  ComponentRef,
  Directive,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigBase } from '../../dynamic-form/interfaces/Config-Base';
import { FieldBase } from '../../dynamic-form/interfaces/Field-Base';
import {
  DynamicModulesMap,
  DYNAMIC_MODULES,
} from '../../tokens/dynamic-modules.token';
import { LoaderService } from './loader.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[generator]',
})
export class GeneratorDirective
  implements FieldBase, OnChanges, OnInit, OnDestroy {
  @Input() config: ConfigBase<string>;
  @Input() group: FormGroup;

  private _destroy = new Subject<void>();
  component: ComponentRef<FieldBase>;

  constructor(
    @Inject(DYNAMIC_MODULES) private dm: DynamicModulesMap,
    private vcr: ViewContainerRef,
    private ls: LoaderService
  ) {}

  ngOnChanges() {
    // prettier-ignore
    if (!this.component) { return; }
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  ngOnDestroy() {
    this._destroy.next();
  }

  ngOnInit() {
    if (!this.dm[this.config.controlClass]) {
      const supportedTypes = Object.keys(this.dm).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.controlClass}).
        Supported types: ${supportedTypes}`
      );
    }

    this.ls
      .load(this.config.controlClass)
      .pipe(
        map(
          (factory) =>
            this.vcr.createComponent(factory) as ComponentRef<FieldBase>
        ),
        tap((component) => (component.instance.config = this.config ?? null)),
        tap((component) => (component.instance.group = this.group ?? null)),
        takeUntil(this._destroy)
      )
      .subscribe();
  }
}
