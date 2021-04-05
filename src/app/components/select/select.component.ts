import { Component, OnInit } from '@angular/core';
import { Control } from '../../dynamic-form/components/control.abstract';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent extends Control {}
