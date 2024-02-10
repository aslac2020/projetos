import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculo-imc',
  templateUrl: './calculo-imc.component.html',
  styleUrls: ['./calculo-imc.component.scss'],
})
export class CalculoImcComponent implements OnInit {
  public formImc!: FormGroup;
  public valueIMC!: any;
  public imageURL!: string;
  public descriptionIMC!: string;

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

  public calculateImc(weight: any, height: any) {
    const imc = weight / (height * height);
    this.valueIMC = this.formatNumber(imc);
    this.resultImcImages(this.valueIMC);
  }

  private formatNumber(number: number): string {
    return number?.toFixed(2).replace('.', '.');
  }

  private resultImcImages(imc: number | any) {
    switch (true) {
      case imc >= '16.00' && imc <= '18.50':
        this.imageURL = 'assets/images/abaixopeso.png';
        this.descriptionIMC =
          'Procure um médico. Algumas pessoas têm um baixo peso por características do seu organismo e tudo bem. Outras podem estar enfrentando problemas, como a desnutrição. É preciso saber qual é o caso.';
        break;
      case imc >= '18.60' && imc <= '24.90':
        this.imageURL = 'assets/images/pesonormal.png';
        this.descriptionIMC =
          'Que bom que você está com o peso normal! E o melhor jeito de continuar assim é mantendo um estilo de vida ativo e uma alimentação equilibrada.';
        break;
      case imc >= '25.00' && imc <= '29.90':
        this.imageURL = 'assets/images/acimadopeso.png';
        this.descriptionIMC =
          'Ele é, na verdade, uma pré-obesidade e muitas pessoas nessa faixa já apresentam doenças associadas, como diabetes e hipertensão. Importante rever hábitos e buscar ajuda antes de, por uma série de fatores, entrar na faixa da obesidade pra valer.';
        break;
      case imc >= '30.00' && imc <= '34.90':
        this.imageURL = 'assets/images/obesidadenivel1.png';
        this.descriptionIMC =
          'Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista.';
        break;
      case imc >= '35.00' && imc <= '39.90':
        this.imageURL = 'assets/images/obesidadenivel2.png';
        this.descriptionIMC =
          'Mesmo que seus exames aparentem estar normais, é hora de se cuidar, iniciando mudanças no estilo de vida com o acompanhamento próximo de profissionais de saúde.';
        break;
      default:
        this.imageURL = 'assets/images/obesidadenivel3.png';
        this.descriptionIMC =
          'Aqui o sinal é vermelho, com forte probabilidade de já existirem doenças muito graves associadas. O tratamento deve ser ainda mais urgente.';
        break;
    }
  }
}
