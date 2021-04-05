import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './services/form.service';
import { GeneratorModule } from '../directives/generator/generator.module';
import { DYNAMIC_INPUT } from '../tokens/dynamic-input.token';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, ReactiveFormsModule, GeneratorModule],
  providers: [FormService, { provide: DYNAMIC_INPUT, useValue: FormComponent }],
  entryComponents: [FormComponent],
  exports: [FormComponent],
})
export class DynamicFormModule {}
