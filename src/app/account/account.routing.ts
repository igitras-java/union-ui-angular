import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
    {
        path: '', component: AccountComponent, children: [
        {path: '', redirectTo: 'profile', pathMatch: 'full'},
        {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
        {path: 'login', component: LoginComponent},
        {path: 'confirm', component: ConfirmComponent},
        {path: 'signup', component: SignupComponent},
        {path: 'forget-password', component: ForgetPasswordComponent},
    ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {
}