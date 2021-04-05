import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { QuestionDataService } from './services/question-data.service';
import { QuestionControlService } from './services/question-control.service';
import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import {
  DynamicModulesMap,
  DYNAMIC_MODULES,
} from './tokens/dynamic-modules.token';
import { GeneratorModule } from './directives/generator/generator.module';

const token: DynamicModulesMap = {
  default: () =>
    import('./components/default/default.module').then((m) => m.DefaultModule),
  button: () =>
    import('./components/button/button.module').then((m) => m.ButtonModule),
  select: () =>
    import('./components/select/select.module').then((m) => m.SelectModule),
  form: () =>
    import('./dynamic-form/dynamic-form.module').then(
      (m) => m.DynamicFormModule
    ),
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicFormModule, GeneratorModule],
  providers: [
    QuestionDataService,
    QuestionControlService,
    { provide: DYNAMIC_MODULES, useValue: token },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
