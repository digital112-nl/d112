import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { UserRegister } from '../../../api/models/user-register';
import { AuthService } from '../auth.service';

export interface Shape {
  color: string;
  borderDirection: string;
}

export interface InformationItem {
  title: string;
  description: string;
}

@Component({
  selector: 'di-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required ]),
  });

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

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

  public async register() {
    const { firstName, lastName, email, password } = this.formGroup.value;

    await this.authService.register({
      firstName,
      lastName,
      email,
      password
    } as UserRegister);

    await this.router.navigateByUrl('/app/redirect');
  }
}
