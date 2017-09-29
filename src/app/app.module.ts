
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CertificationComponent } from './certification/certification.component';
import { CreditComponent } from './credit/credit.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './_shared/guards/auth.guard';
import { SecurityService } from './_shared/services/security.service';
import { BlockchainService } from './services/blockchain';
import { LinkedChainContract } from './_contracts/linkedchain.contract';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
     { path: "", component: DashboardComponent },
     { path: "dashboard", component: DashboardComponent },
     { path: "**", component: DashboardComponent },
    ]
   }
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SignUpComponent,
    DashboardComponent,
    CertificationComponent,
    CreditComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [LinkedChainContract,BlockchainService,SecurityService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
