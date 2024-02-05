import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculoImcComponent } from './pages/calculo-imc/calculo-imc.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'calculo-imc',
    component: CalculoImcComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
