import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    //users es de tipo User [] que es un array
    users: User[] = [
      {nombre: 'Milagros', correo: 'milagros@gmail.com', password: 'casa2024'},
      {nombre: 'Pepe', correo: 'pepe@gmail.com', password: '123ASD'},
    ];
  
    registroActivo: boolean = false;
    nombre: string = '';
    correo: string = '';
    //correoInput: string = '';
    password: string = '';
    passwordInput: string = '';
    confirmPassword: string = '';
  
    constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
    }
  
    toggle() {
      if (this.registroActivo){
        this.registroActivo = false;
      }else{
        this.registroActivo = true;
      }
      console.log(this.registroActivo)
    }
  
    //Uso el metodo find para buscar en storedusers un usuario que coincida. Si encuentra un usuario que cumple con las condiciones, lo asigna a la variable user. Si no lo encuentra, user será undefined.
    login() {
      const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find(user => user.correo === this.correo && user.password === this.password);
      console.log(this.correo)
      console.log(this.password)
      if (user) {
        localStorage.setItem('loggedUser', JSON.stringify({ correo: user.correo, password: user.password }));
        this.router.navigate(['/welcome']);
      } else {
        alert('Correo o contraseña incorrectos');
      }
    }
  
    register() {
      if (this.passwordInput !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
  
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find(user => user.correo === this.correo);
  
      if (userExists) {
        alert('El usuario ya existe');
        return;
      }
  
      // Crear nuevo usuario
      const newUser: User = {
        nombre: this.nombre,
        correo: this.correo,
        password: this.passwordInput
      };
  
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Usuario registrado con éxito');
      this.toggle(); 
    }
  }
  
  interface User {
    nombre: string;
    correo: string;
    password: string;
  }



  


