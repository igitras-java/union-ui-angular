import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule,
        CustomMaterialModule
    ],
    declarations: [
        AccountComponent,
        ForgetPasswordComponent,
        LoginComponent,
        ProfileComponent,
        SignupComponent,
        ConfirmComponent
    ]
})
export class AccountModule {
}
