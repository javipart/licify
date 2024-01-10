import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const expectedUserType = route.data['userType'];
  const router = inject(Router);
  const accountService = inject(AuthGuardService);
  const user = accountService.userValue;
  if (user && expectedUserType && user.type === expectedUserType) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
}