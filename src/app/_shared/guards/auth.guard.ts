import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

// services
import { SecurityService } from "../services/security.service";

@Injectable()
export class AuthGuard {

  constructor(private securityService: SecurityService, private router: Router ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.securityService.isAuthenticated()) {
        return true;
      }
      this.router.navigate(["/sign-up"], { queryParams: { returnUrl: state.url }});
      return false;
  }
}