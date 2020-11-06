import { Component,Input } from '@angular/core';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})



export class FormInputsComponent {



  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  @Input() hero
  constructor() {}
}
