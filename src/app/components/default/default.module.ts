import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DYNAMIC_INPUT } from '../../tokens/dynamic-input.token';

@NgModule({
  declarations: [DefaultComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{ provide: DYNAMIC_INPUT, useValue: DefaultComponent }],
  exports: [DefaultComponent],
})
export class DefaultModule {}
