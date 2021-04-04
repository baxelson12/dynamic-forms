import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { GeneratorDirective } from './directives/generator.directive';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './services/form.service';
import { SelectComponent } from './components/select/select.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [DefaultComponent, GeneratorDirective, FormComponent, SelectComponent, ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [FormService],
  entryComponents: [DefaultComponent],
  exports: [FormComponent],
})
export class DynamicFormModule {}
