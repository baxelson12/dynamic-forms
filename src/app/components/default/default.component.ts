import { Component } from '@angular/core';
import { Control } from '../../abstractions/control.abstract';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent extends Control {}
