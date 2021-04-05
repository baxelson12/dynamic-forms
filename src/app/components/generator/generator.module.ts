import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorDirective } from './generator.directive';
import { GeneratorService } from './generator.service';

@NgModule({
  declarations: [GeneratorDirective],
  imports: [CommonModule],
  providers: [GeneratorService],
  exports: [GeneratorDirective],
})
export class GeneratorModule {}
