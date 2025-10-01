import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ListComponent } from './auth/components/list/list.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "auth/login", component: LoginComponent },
  { path: "auth/users", component: ListComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
