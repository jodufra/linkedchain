
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CertificationComponent } from './certification/certification.component';
import { CreditComponent } from './credit/credit.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '',
    redirectTo: '/sign-up',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    CertificationComponent,
    CreditComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
