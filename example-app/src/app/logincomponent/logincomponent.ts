import { Component, OnInit } from '@angular/core';
import { Login } from '../common/login';
import { Loginregservice } from '../services/loginregservice';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Userservice } from '../services/userservice';
import {Useraddressservice} from '../services/useraddressservice'; // Assuming this service provides the default address
@Component({
  selector: 'app-logincomponent',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css'
})
export class Logincomponent implements OnInit {
  // This component can be used to handle user login functionality
  // You can inject services like AuthService to manage authentication  
  // and implement methods to handle login logic, form validation, etc.
  // For now, it can be a placeholder or can be extended later as needed.
  loginForm!: FormGroup;

  
  loginResponse:Login = new Login();
  userId: number = 0;
 constructor(private fb: FormBuilder,private loginService: Loginregservice,private route: Router,private userServ: Userservice,private Useraddressservice: Useraddressservice) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  

    onLogin(): void {
    if(this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      console.log('Login credentials:', credentials);
    
 this.loginService.login(credentials).subscribe({
      next: (response) => {
        // Handle success (e.g., store token, navigate to dashboard)
        this.loginResponse= response
        console.log('Login successful:', response);
        this.userServ.setUser(this.loginResponse); // Set user details in Userservice
        this.route.navigate(['/products']); // Navigate to products page on successful login

      },
      error: (err) => {
        // Handle error (e.g., show alert)
        console.error('Login failed:', err);
      },
    });
  }
  else{
    console.error('values is invalid');
  }
}

personDetails():Login{
  return this.loginResponse;
}
ngOnInit(): void {
 
     this.userServ.user$.subscribe(user => {
      if(user?.id) {
        this.userId = user.id;
        console.log('User details:', user);
        this.Useraddressservice.getAddress(user.id); // Fetch address for the logged-in user  
    
        
  
  this.Useraddressservice.selectedAddress$.subscribe(addr => {
  console.log('Default for current user:', addr);
  
});
      }
      else{
        console.log('No user is logged in');
      }
}
    );
}
 

}
