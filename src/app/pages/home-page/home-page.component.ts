import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionalidade } from './../../model/Funcionalidade';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public funcionalidades!: Funcionalidade[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarFuncionalidades();
  }

  carregarFuncionalidades() {
    this.funcionalidades = [];
    this.funcionalidades = [
      {
        id: 0,
        titulo: 'Chat com IA',
        urlImage: './assets/images/chatai.png',
        descricao: 'Tire suas duvidas com esse poderoso chat',
      },
      {
        id: 1,
        titulo: 'Peso ideal',
        urlImage: './assets/images/imc.png',
        descricao: 'Calcule seu imc(Índice de Massa Corporal)',
      },
      {
        id: 2,
        titulo: 'Leitor de PDF',
        urlImage: './assets/images/leitorpdf.png',
        descricao: 'Leitor de Pdf com audio',
      },
    ];
  }

  public navegarProjetos(idProjeto: number) {
    switch (idProjeto) {
      case 0:
        this.router.navigate(['']);
        break;
      case 1:
        this.router.navigate(['/calculo-imc']);
        break;
      case 2:
        this.router.navigate(['/leitor-pdf']);
        break;
      default:
        break;
    }
  }
}
