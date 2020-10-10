import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

export interface Shape {
  color: string;
  borderDirection: string;
}

export interface InformationItem {
  title: string;
  description: string;
}

@Component({
  selector: 'di-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public informationItems: InformationItem[] = [
    {
      title: 'Respond faster to an incident',
      description: 'With our powerful AI we can determine the situation immediately so that the person in need can get their help as fast as possible.'
    },
    {
      title: 'AI is the next big thing',
      description: 'With our powerful AI we can determine the situation immediately so that the person in need can get their help as fast as possible.'
    },
    {
      title: 'Helping people faster',
      description: 'With our powerful AI we can determine the situation immediately so that the person in need can get their help as fast as possible.'
    }
  ];

  public activeIndex = 0;

  public shapes: Shape[] = [];
  private colors: string[] = ['#273148', '#333D54', '#40495E'];
  private directions: string[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  private interval;

  public ngOnInit() {
    this.setInterval();
    const shapeAmount = 16;

    for (let i = 0; i < shapeAmount; i++) {
      this.shapes.push({
        color: this.colors[ Math.floor(Math.random() * this.colors.length) ],
        borderDirection: this.directions[ Math.floor(Math.random() * this.directions.length) ]
      });
    }
  }

  public switchItem(i: number) {
    clearInterval(this.interval);
    this.activeIndex = i;
    this.setInterval();
  }

  private setInterval() {
    if ( !_.isNil(this.informationItems) ) {
      this.interval = setInterval(() => {
        if ( this.activeIndex < (this.informationItems.length - 1) ) {
          this.activeIndex++;
        } else {
          this.activeIndex = 0;
        }
      }, 10 * 1000);
    }
  }
}
