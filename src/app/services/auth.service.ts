import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); 
  }

  // Método para cerrar sesión 
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
