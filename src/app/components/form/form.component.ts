import { Component, EventEmitter, Output } from '@angular/core';
import { BaseFormGroup } from '../../abstractions/group.abstract';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  exportAs: 'form',
})
export class FormComponent extends BaseFormGroup {
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
}
