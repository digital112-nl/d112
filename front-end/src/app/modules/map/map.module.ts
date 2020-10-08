import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from '../../shared/shared.module';
import { MapPageComponent } from './map-page/map-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    LeafletModule
  ],
  declarations: [
    MapPageComponent
  ]
})
export class MapModule {

}
