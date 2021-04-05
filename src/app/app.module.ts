import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LayoutDataService } from './services/layout-data.service';
import { AppComponent } from './app.component';
import { DynamicFormModule } from './components/form/form.module';
import { DYNAMIC_MODULES } from './tokens/dynamic-modules.token';
import { ModuleRegistry } from './registries/module-registry';
import { GeneratorModule } from './components/generator/generator.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicFormModule, GeneratorModule],
  providers: [
    LayoutDataService,
    { provide: DYNAMIC_MODULES, useValue: ModuleRegistry },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
