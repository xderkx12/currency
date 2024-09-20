import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivePageComponent } from './Pages/archive-page/archive-page.component';
import { CurrencyRatesPageComponent } from './Pages/currency-rates-page/currency-rates-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'currency-rate', pathMatch: 'full' },
  { path: 'archive', component: ArchivePageComponent },
  { path: 'currency-rate', component: CurrencyRatesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
