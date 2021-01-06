import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginLayoutRoutes} from './login-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '../../pages/Login/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {MatCardModule} from '@angular/material/card';
import {ButtonModule} from 'primeng/button';


@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(LoginLayoutRoutes),
    FormsModule,
    NgbModule,
    ToastModule,
    ReactiveFormsModule,
    CardModule,
    MatCardModule,
    ButtonModule
  ],
  declarations:[
    LoginComponent
  ]
})
export class LoginLayoutModule{}
