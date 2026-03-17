import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<User>(); 

  form!: FormGroup;  // ✅ declare first

  constructor(private fb: FormBuilder) {
    // ✅ initialize inside constructor
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

 submit() {
  if (this.form.valid) {
    this.save.emit(this.form.value as User); 
  }
}
}