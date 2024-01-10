import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthGuardService } from '../service/auth-guard.service';

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const accountService = inject(AuthGuardService);
  const user = accountService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = request.url.startsWith(environment.apiUrl);
  if (isLoggedIn && isApiUrl) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${user.token}` }
    });
  }

  return next(request);
}