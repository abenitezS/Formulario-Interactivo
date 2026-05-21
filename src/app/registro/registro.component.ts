import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;
  formularioEnviado = false;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: [''],
    });
  }

  get f() {
    return this.registroForm.controls;
  }

  get erroresNombre(): string[] {
    const errores = [];
    if (this.f['nombre']?.hasError('required'))
      errores.push('El nombre es obligatorio');
    if (this.f['nombre']?.hasError('minlength'))
      errores.push('El nombre debe tener al menos 3 caracteres');
    return errores;
  }

  get erroresEmail(): string[] {
    const errores = [];
    if (this.f['email']?.hasError('required'))
      errores.push('El email es obligatorio');
    if (this.f['email']?.hasError('email'))
      errores.push('El email no tiene un formato válido');
    return errores;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Datos enviados:', this.registroForm.value);
      this.formularioEnviado = true;
      this.registroForm.reset();

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        this.formularioEnviado = false;
      }, 3000);
    }
  }
}
