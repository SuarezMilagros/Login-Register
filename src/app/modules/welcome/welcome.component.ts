import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  userForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con validaciones para los tres campos
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Llenamos el formulario con datos simulados del usuario
    this.userForm.setValue({
      name: '',
      email: '',
      password: ''
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulario guardado:', this.userForm.value);
      this.isEditing = false;
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}

