import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { jwtInterceptor, errorInterceptor } from './app/core/interceptors';
import { APP_ROUTES } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withInterceptors([
        jwtInterceptor,
        errorInterceptor,
    ])),
    provideAnimations(),
    importProvidersFrom(MatNativeDateModule)
]
});