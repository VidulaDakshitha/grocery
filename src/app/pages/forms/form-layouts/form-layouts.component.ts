import { Component } from '@angular/core';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
})
export class FormLayoutsComponent {
  colorValue = 'red';
  input1 = '';
  input2 = '';
  tokenType = localStorage.getItem("type");

  data = [
  {
    name: 'vidula',
    age: '25',
  },
  {
    name: 'praveen',
    age: '25',
  },
];

  data1 = "vidula" ;

  getValues(val) {
  console.warn(val)
  }

  changeColor() {
    this.colorValue = 'blue';
  }

}
