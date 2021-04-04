import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionDataService } from './services/question-data.service';
import { QuestionControlService } from './services/question-control.service';
import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicFormModule],
  providers: [QuestionDataService, QuestionControlService],
  bootstrap: [AppComponent],
})
export class AppModule {}
