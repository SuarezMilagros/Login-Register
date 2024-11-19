import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroActivo: boolean = false;
  registroForm!: FormGroup;
  password: any;
  correo: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicialización del formulario reactivo de registro
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggle() {
    this.registroActivo = !this.registroActivo;
  }

  login() {
    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(user => user.correo === this.registroForm.value.correo && user.password === this.registroForm.value.password);
    
    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify({ correo: user.correo, password: user.password }));
      this.router.navigate(['/welcome']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

  register() {
    if (this.registroForm.invalid) {
      alert('Por favor, completa correctamente todos los campos');
      return;
    }
    
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(user => user.correo === this.registroForm.value.correo);
    
    if (userExists) {
      alert('El usuario ya existe');
      return;
    }

    // Crear nuevo usuario
    const newUser: User = {
      nombre: this.registroForm.value.nombre,
      correo: this.registroForm.value.correo,
      password: this.registroForm.value.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario registrado con éxito');
    this.toggle(); // Cambia a la vista de inicio de sesión después del registro
  }
}

interface User {
  nombre: string;
  correo: string;
  password: string;
}


