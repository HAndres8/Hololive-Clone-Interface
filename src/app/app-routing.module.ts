import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTalentsComponent } from './components/list-talents/list-talents.component';

const routes: Routes = [
  { path: 'talents', component: ListTalentsComponent },
  { path: '**', redirectTo: 'talents', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
