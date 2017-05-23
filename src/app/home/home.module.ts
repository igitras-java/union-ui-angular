import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CustomMaterialModule } from '../custom-material.module';
import { IgSearchModule } from '@igitras/core';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        CustomMaterialModule,
        IgSearchModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {
}