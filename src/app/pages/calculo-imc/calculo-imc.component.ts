import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMC } from 'src/app/model/Imc';

@Component({
  selector: 'app-calculo-imc',
  templateUrl: './calculo-imc.component.html',
  styleUrls: ['./calculo-imc.component.scss'],
})
export class CalculoImcComponent implements OnInit {
  formImc!: FormGroup;
  dataIMC!: IMC;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initiateForm();
  }

  initiateForm() {
    this.formImc = this.formBuilder.group({
      Weigth: ['', Validators.required],
      Height: ['', Validators.required],
    });
  }

  calculateImc() {
    const formValue = this.formImc.getRawValue();
    console.log(formValue);
  }
}
