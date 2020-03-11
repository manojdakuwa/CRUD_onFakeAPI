import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './UserManagement/register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'Login',component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
