import { Component, Output } from '@angular/core';
import { control, Layer, Map, MapOptions, tileLayer } from 'leaflet';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'di-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  public options: MapOptions = {
    center: {
      lat: 51.585720,
      lng: 4.793230
    },
    zoomControl: false,
    zoom: 14
  };

  public layers: Layer[] = [
    tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      minZoom: 2,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'light-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoid3Zka29wIiwiYSI6ImNrY3lrY3p5ZDBhdHEzNG1tdmNuNG05bXEifQ.WqwLNgLiQuDsm2J9XReRkw'
    })
  ];

  @Output() public onMapReady: BehaviorSubject<Map> = new BehaviorSubject<Map>(null);

  private map: Map;

  public internalMapReady($event: Map) {
    this.map = $event;
    this.onMapReady.next($event);
    setTimeout(() => this.map.invalidateSize(), 100);

    control.zoom({
      position: 'topright'
    }).addTo(this.map);
  }
}
