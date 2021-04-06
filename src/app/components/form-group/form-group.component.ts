import { Component } from '@angular/core';
import { BaseFormGroup } from '../../abstractions/group.abstract';
import { FormService } from '../form/form.service';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
})
export class FormGroupComponent extends BaseFormGroup {
  groupName: string;
  group;
  set config(val: any) {
    this.heading = val.heading;
    this.groupName = val.key;
    this._config = val.data;
  }

  get config() {
    return this._config;
  }
}
