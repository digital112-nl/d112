import { Component, HostBinding, Input, NgZone, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {
  control,
  DivIcon,
  FeatureGroup,
  Layer,
  Map,
  MapOptions,
  Marker,
  tileLayer,
  MarkerClusterGroupOptions,
  MarkerCluster, divIcon, point
} from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { ReportModel } from '../../../api/models';
import { isNil } from 'lodash';

@Component({
  selector: 'di-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnChanges {

  @HostBinding('class.full-map')
  @Input() public fullMap = false;

  @Input() public reports: ReportModel[] = [];
  @Input() public padding = 50;
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
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'light-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoid3Zka29wIiwiYSI6ImNrY3lrY3p5ZDBhdHEzNG1tdmNuNG05bXEifQ.WqwLNgLiQuDsm2J9XReRkw'
    })
  ];
  @Output() public onMapReady: BehaviorSubject<Map> = new BehaviorSubject<Map>(null);
  public markerClusterData: Marker[] = [];
  public markerClusterOptions: MarkerClusterGroupOptions = {
    iconCreateFunction: (cluster => this.createIcon(cluster))
  };
  private map: Map;
  private icon: DivIcon = new DivIcon({
    className: 'map-icon',
    iconSize: [ 15, 15 ],
    html: `<i class="di-icon di-alarm-1"></i>`
  });

  constructor(
    private router: Router,
    private zone: NgZone
  ) {
  }

  public internalMapReady($event: Map) {
    this.map = $event;
    this.onMapReady.next($event);
    setTimeout(() => this.map.invalidateSize(), 100);
    this.mapReports(this.reports);

    control.zoom({
      position: 'topright'
    }).addTo(this.map);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ( !isNil(changes.reports) ) {
      this.mapReports(this.reports);
    }
  }

  private mapReports(reports: ReportModel[]) {
    if ( isNil(this.map) ) {
      return;
    }

    this.markerClusterData = [];

    for (const report of reports) {
      const marker = new Marker([ report.location.lat, report.location.lon ], {
        icon: this.icon
      });
      marker.on('click', () => this.zone.run(() => this.router.navigateByUrl('/app/scenarios/' + report._id)));
      this.markerClusterData.push(marker);
    }

    const markerGroup = new FeatureGroup(this.markerClusterData);
    const sw = markerGroup.getBounds().getSouthWest();
    const ne = markerGroup.getBounds().getNorthEast();

    if ( isNil(sw) || isNil(ne) ) {
      return;
    }

    this.map.fitBounds([
      [ sw.lat, sw.lng ],
      [ ne.lat, ne.lng ]
    ], {
      padding: [ this.padding, this.padding ]
    });
  }

  private createIcon(cluster: MarkerCluster) {
    const markers = cluster.getAllChildMarkers();
    return divIcon({
      html: `${markers.length}`,
      className: 'map-icon',
      iconSize: point(30, 30)
    });
  }
}
