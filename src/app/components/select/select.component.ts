import { Component } from '@angular/core';
import { Control } from '../../abstractions/control.abstract';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent extends Control {}
