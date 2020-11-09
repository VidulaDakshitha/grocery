import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthSocialLink } from '@nebular/auth/auth.options';
import { NbAuthService } from '@nebular/auth';
import * as ɵngcc0 from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  protected service: NbAuthService;
  protected options: {};
  protected cd: ChangeDetectorRef;

  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;


  constructor(private router: Router) { }

  login(){
    this.router.navigate(['/pages']);
  }
  getConfigValue(key: string){

  }
  // static ɵfac: ɵngcc0.ɵɵFactoryDef<LoginComponent, never>;
  // static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<LoginComponent, "nb-login", never, {}, {}, never, never>;

  ngOnInit(): void {
  }
}
