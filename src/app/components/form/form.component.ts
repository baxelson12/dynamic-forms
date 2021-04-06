import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { BaseFormGroup } from '../../abstractions/group.abstract';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  exportAs: 'form',
})
export class FormComponent extends BaseFormGroup implements AfterViewInit {
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  ngAfterViewInit() {
    // this.form.setValue({})
  }
}
