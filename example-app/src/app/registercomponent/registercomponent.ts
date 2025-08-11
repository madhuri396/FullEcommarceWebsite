import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loginregservice } from '../services/loginregservice';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-registercomponent',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registercomponent.html',
  styleUrl: './registercomponent.css'
})
export class Registercomponent {


  registrationForm: FormGroup;
  registrationSuccess = false;

  constructor(private fb: FormBuilder, private loginService: Loginregservice) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber:['', Validators.required],
      addresses: this.fb.array([
        this.fb.group({
           receiverName:['', Validators.required],
           phoneNumber:['', Validators.required],
          line1: ['', Validators.required],
          line2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zipCode: ['', Validators.required],
          country: ['', Validators.required],
          type: ['shipping', Validators.required]
        })
      ])
    });
  }

  get addresses(): FormArray {
    return this.registrationForm.get('addresses') as FormArray;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const postData = this.registrationForm.value;
      this.loginService.postRegisterData(postData).subscribe({
        next: (response) => {
          console.log('✅ Registration successful:', response);
          this.registrationSuccess = true;
          this.registrationForm.disable(); // Optional: lock form after success
        },
        error: (err) => {
          console.error('❌ Registration failed:', err);
        }
      });
    }
  }
}