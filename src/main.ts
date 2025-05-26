import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { KeycloakService } from './app/services/keycloak.service';

const keycloakService = new KeycloakService();

keycloakService
  .init()
  .then(() => {
    if (!keycloakService.isLoggedIn()) {
      keycloakService.login(); // Redirects — no need to return
      return; // Exit early
    }

    return bootstrapApplication(AppComponent, {
      providers: [
        ...appConfig.providers!,
        { provide: KeycloakService, useValue: keycloakService },
      ],
    });
  })
  .catch((err) => {
    console.error('Keycloak initialization failed', err);
  });

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
