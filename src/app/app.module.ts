
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LayoutComponent } from './layout/layout.component';
import { AccountComponent } from './account/account.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { AuthGuard } from './_shared/guards/auth.guard';
import { SecurityService } from './_shared/services/security.service';
import { BlockchainService } from './_shared/services/blockchain';
import { LinkedChainContract } from './_shared/smartcontracts/linkedchain.contract';
import { SessionService } from './_shared/services/session';
import { AssignComponent } from './assign/assign.component';
import { BreadcrumbComponent } from './_shared/components/breadcrumb';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
     { path: "", component: CertificatesComponent },
     { path: "account", component: AccountComponent },
     { path: "certificates", component: CertificatesComponent },
     { path: "assign", component: AssignComponent },
     { path: "**", component: CertificatesComponent },
    ]
   }
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SignUpComponent,
    CertificatesComponent,
    AccountComponent,
    AssignComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    LinkedChainContract,
    SessionService,
    BlockchainService,
    SecurityService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
