import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'NEC realm',
    clientId: 'NEC_CLIENT_ID',
  });

  init(): Promise<boolean> {
    return this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    });
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    return this.keycloak.logout();
  }

  isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getUsername(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] ?? '';
  }
}
