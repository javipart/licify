import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthGuardService } from '../service/auth-guard.service';

export function errorInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    const accountService = inject(AuthGuardService);
    return next(request).pipe(catchError(err => {
        if ([401, 403].includes(err.status) && accountService.userValue) {
            accountService.logout();
        }

        const error = err.error?.message || err.statusText;
        return throwError(() => error);
    }))
}