import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DYNAMIC_INPUT } from '../../tokens/dynamic-input.token';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{ provide: DYNAMIC_INPUT, useValue: SelectComponent }],
  exports: [SelectComponent],
})
export class SelectModule {}
