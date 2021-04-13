import {
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
import { ConfigBase } from '../../interfaces/Config-Base';
import {
  DynamicModulesMap,
  DYNAMIC_MODULES,
} from '../../tokens/dynamic-modules.token';
import { GeneratorService } from './generator.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Control } from '../../abstractions/control.abstract';

@Directive({
  selector: '[generator]',
})
export class GeneratorDirective implements OnChanges, OnInit, OnDestroy {
  @Input() config: ConfigBase<string>;
  @Input() group: FormGroup;

  private _destroy = new Subject<void>();
  component: ComponentRef<Control>;

  constructor(
    @Inject(DYNAMIC_MODULES) private dm: DynamicModulesMap,
    private vcr: ViewContainerRef,
    private gs: GeneratorService
  ) {}

  ngOnInit(): void {
    this.gs
      .load(this.config.controlClass)
      .pipe(
        map(
          (factory) =>
            this.vcr.createComponent(factory) as ComponentRef<Control>
        ),
        tap((component) => (component.instance.config = this.config ?? null)),
        tap((component) => (component.instance.group = this.group ?? null)),
        takeUntil(this._destroy)
      )
      .subscribe();
  }

  ngOnChanges(): void {
    // prettier-ignore
    if (!this.component) { return; }
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }
}
