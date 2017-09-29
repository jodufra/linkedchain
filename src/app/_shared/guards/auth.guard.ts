import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

// services
import { SecurityService } from "../services/security.service";
import { SessionService } from "../services/session";

@Injectable()
export class AuthGuard {

  constructor(
    private sessionService: SessionService, 
    private securityService: SecurityService, 
    private router: Router 
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.securityService.isAuthenticated()) {
        this.sessionService.load();
        return true;
      }
      this.sessionService.clear();
      this.router.navigate(["/sign-up"], { queryParams: { returnUrl: state.url }});
      return false;
  }
}