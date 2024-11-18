import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Si el usuario está autenticado, redirige a la página principal
      this.router.navigate(['/']);
      return false;
    }
    // Si el usuario no está autenticado, permite el acceso a la página de registros
    return true;
  }
}
