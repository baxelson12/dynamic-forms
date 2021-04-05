import { Component, OnInit } from '@angular/core';
import { Control } from '../../dynamic-form/components/control.abstract';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent extends Control {}
