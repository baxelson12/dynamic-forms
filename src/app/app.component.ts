import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigBase } from './interfaces/Config-Base';
import { LayoutDataService } from './services/layout-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config$: Observable<ConfigBase<string>[]>;

  constructor(private qds: LayoutDataService) {
    this.config$ = this.qds.getConverted();
  }
}
