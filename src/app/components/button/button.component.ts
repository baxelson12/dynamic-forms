import { Component } from '@angular/core';
import { Control } from '../../abstractions/control.abstract';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent extends Control {}
