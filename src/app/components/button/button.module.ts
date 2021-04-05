import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DYNAMIC_INPUT } from '../../tokens/dynamic-input.token';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{ provide: DYNAMIC_INPUT, useValue: ButtonComponent }],
  exports: [ButtonComponent],
})
export class ButtonModule {}
