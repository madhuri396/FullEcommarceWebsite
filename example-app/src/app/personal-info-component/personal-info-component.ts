import { Component, OnInit } from '@angular/core';
import { Userservice } from '../services/userservice';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Loginregservice } from '../services/loginregservice';
import { Login } from '../common/login';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info-component',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './personal-info-component.html',
  styleUrl: './personal-info-component.css'
})
export class PersonalInfoComponent implements OnInit {
  // Define properties for personal information
  
 userData!: Login;
  isEditMode = false;
  userForm!: FormGroup;
isuser:any;
  constructor(private fb: FormBuilder, private loginService: Loginregservice,private userServ:Userservice,private router:Router) {}

  ngOnInit(): void {
    // Simulate fetching user data (replace with actual logic)
   // this.loginService.login({ email: 'user@example.com', password: 'dummy' }).subscribe(user => {
     this.userServ.user$.subscribe(user => {
       if (user) {
    this.userData = user;
    this.initForm(user);
  } else {
    // Handle null case (e.g., redirect to login or show error)
    console.warn('No user data available');
    this.router.navigate(['/login']); // or show a message
  }

    // this.isuser = user;
    // this.userData = user;


    
      
  });

  }

  initForm(user: Login): void {
    this.userForm = this.fb.group({
      username: [user.username],
      email: [user.email],
      phoneNumber: [user.phoneNumber],
      role: [user.role]
    });
  }

  editDetails(): void {
    this.isEditMode = true;
  }

  saveDetails(): void {
    const updatedUser: Login = {
      ...this.userData,
      ...this.userForm.value
    };
    //updatedUser.id = this.isuser.id; // Ensure the user ID is set

    this.loginService.updateProfile(updatedUser).subscribe(response => {
      this.userData.email= response.email;
      this.userData.username = response.username;
      this.userData.phoneNumber = response.phoneNumber;
     // this.userData.role= this.userData.role || 'user'; // Ensure role is set
      // this.userData = response;
      // this.userData.role = this.userData.role || 'user'; // Ensure role is set
      this.isEditMode = false;
    });
  }

  cancelEdit(): void {
    this.userForm.patchValue(this.userData);
    this.isEditMode = false;
  }
 changePassword(): void {
    // implement logic here
   this.router.navigate(['/password-change']);
    console.log("Change password clicked");
  }

  deleteAccount(): void {
    // implement logic here
    console.log("Delete account clicked");
  }

}
