import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './form-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneratorModule } from '../generator/generator.module';
import { FormService } from '../form/form.service';
import { DYNAMIC_INPUT } from '../../tokens/dynamic-input.token';

@NgModule({
  declarations: [FormGroupComponent],
  imports: [CommonModule, ReactiveFormsModule, GeneratorModule],
  providers: [
    FormService,
    { provide: DYNAMIC_INPUT, useValue: FormGroupComponent },
  ],
  exports: [FormGroupComponent],
})
export class FormGroupModule {}
