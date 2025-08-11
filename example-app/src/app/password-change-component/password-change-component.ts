// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PassChange } from '../common/pass-change';
// import { Loginregservice } from '../services/loginregservice';
// import { Login } from '../common/login';

// @Component({
//   selector: 'app-password-change-component',
//   imports: [CommonModule, ReactiveFormsModule, FormsModule],
//   templateUrl: './password-change-component.html',
//   styleUrl: './password-change-component.css'
// })
// export class PasswordChangeComponent {
// passForm: FormGroup;
//   message = '';
//   error = '';

//   constructor(private fb: FormBuilder, private loginService: Loginregservice) {
//     this.passForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       oldPassword: ['', Validators.required],
//       newPassword: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onSubmit(): void {
//     if (this.passForm.valid) {
//       const payload: PassChange = this.passForm.value;

//       this.loginService.updatePassword(payload).subscribe({
//         next: (response: Login) => {
//           this.message = 'Password updated successfully!';
//           this.error = '';
//           this.passForm.reset();
//         },
//         error: (err) => {
//           this.error = 'Failed to update password. Please try again.';
//           this.message = '';
//           console.error('Password update error:', err);
//         }
//       });
//     }
//   }


// }
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassChange } from '../common/pass-change';
import { Loginregservice } from '../services/loginregservice';
import { Login } from '../common/login';
import { Location } from '@angular/common';
@Component({
  selector: 'app-password-change-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './password-change-component.html',
  styleUrl: './password-change-component.css'
})
export class PasswordChangeComponent {
  passForm: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private loginService: Loginregservice, private location: Location) {
    this.passForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.passForm.valid) {
      const payload: PassChange = {
        email: this.passForm.value.email,
        oldpassword: this.passForm.value.oldPassword,
        newpassword: this.passForm.value.newPassword
      };

      this.loginService.updatePassword(payload).subscribe({
        next: (response: Login) => {
          this.message = '✅ Password updated successfully!';
          this.error = '';
          this.passForm.reset();
          this.location.back(); // Navigate back after successful update
        },
        error: (err) => {
          this.error = '❌ Failed to update password. Please try again.';
          this.message = '';
          console.error('Password update error:', err);
        }
      });
    }
  }
   goback(){
  this.location.back(); 
  }
}
