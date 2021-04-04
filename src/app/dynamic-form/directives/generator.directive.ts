import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigBase } from '../interfaces/Config-Base';
import { FieldBase } from '../interfaces/Field-Base';
import { DefaultComponent } from '../components/default/default.component';
import { SelectComponent } from '../components/select/select.component';
import { ButtonComponent } from '../components/button/button.component';

const components: { [type: string]: Type<FieldBase> } = {
  default: DefaultComponent,
  button: ButtonComponent,
  select: SelectComponent,
};

@Directive({
  selector: '[generator]',
})
export class GeneratorDirective implements FieldBase, OnChanges, OnInit {
  @Input() config: ConfigBase<string>;
  @Input() group: FormGroup;

  component: ComponentRef<FieldBase>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) {}

  ngOnChanges() {
    // prettier-ignore
    if (!this.component) { return; }
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  ngOnInit() {
    if (!components[this.config.controlClass]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.controlClass}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<FieldBase>(
      components[this.config.controlClass]
    );
    this.component = this.vcr.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
