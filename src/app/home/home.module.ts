import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        CustomMaterialModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {
}