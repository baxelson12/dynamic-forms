import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigBase } from './dynamic-form/interfaces/Config-Base';
import { QuestionDataService } from './services/question-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config$: Observable<ConfigBase<string>[]>;

  constructor(private qds: QuestionDataService) {
    this.config$ = this.qds.getConverted();
  }
}
