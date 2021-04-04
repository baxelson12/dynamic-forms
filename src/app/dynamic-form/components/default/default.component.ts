import { Component, forwardRef, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { ConfigBase } from '../../interfaces/Config-Base';
import { Control } from '../control.abstract';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent extends Control {}
