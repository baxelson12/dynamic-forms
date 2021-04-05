import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorDirective } from './generator.directive';
import { LoaderService } from './loader.service';

@NgModule({
  declarations: [GeneratorDirective],
  imports: [CommonModule],
  providers: [LoaderService],
  exports: [GeneratorDirective],
})
export class GeneratorModule {}
