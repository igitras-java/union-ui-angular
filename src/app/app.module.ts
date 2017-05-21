import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccountService } from './shared/service/account/account.service';
import { AuthService } from './shared/service/common/auth.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { Requests } from './shared/util/request';
import { AdminRoleGuard } from './shared/guard/role.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material.module';

@NgModule({
declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        CustomMaterialModule,
        SharedModule,
        AppRoutingModule,
        HomeModule
    ],
    providers: [
        AccountService,
        AuthService,
        AuthGuard,
        AdminRoleGuard,
        Requests
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
