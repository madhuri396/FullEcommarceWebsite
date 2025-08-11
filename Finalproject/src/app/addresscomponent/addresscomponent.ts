import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AddressDTO } from '../common/addressdto';
import { Loginregservice } from '../services/loginregservice';
import { Userservice } from '../services/userservice';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Useraddressservice } from '../services/useraddressservice';

@Component({
  selector: 'app-addresscomponent',
  imports:[CommonModule,FormsModule,RouterModule],
  templateUrl: './addresscomponent.html',
  styleUrls: ['./addresscomponent.css']
})
export class AddressComponent implements OnInit {
  addresses: AddressDTO[] = [];
  selectedAddressIndex: number | null = null;
 userId: number = 0;
  constructor(
    private loginRegService: Loginregservice,
    private route: ActivatedRoute,
    private userService: Userservice,
    private addService:Useraddressservice
  ) {}

  ngOnInit(): void {
    this.userService.user$.pipe(
      switchMap(user => {
        const userId = user?.id;
        if (!userId) {
          console.warn('User ID missing or invalid');
          return of([]);
        }
        this.userId = userId; // Store userId for later use
        return this.loginRegService.getAddresses(userId);
      }),
      catchError(err => {
        console.error('Error fetching addresses:', err);
        return of([]);
      })
    ).subscribe(data => {
      this.addresses = data;
       if (this.addresses?.length && !this.selectedAddressIndex) {
    this.selectedAddressIndex =0; // Set first address as default
    console.log("triggered", this.addresses);
  }
  this.addService.triggerRefresh(this.userId);
  console.log("triggered");

    });
  }

  selectAddress(index: number): void {
    this.selectedAddressIndex = index;
   this.addService.selectAddress(this.addresses[index]);
  }
  onDeleteAddress(addressId: number): void {
    if (confirm('Are you sure you want to delete this address?')) {

      this.addService.removeAddress(this.userId, addressId);
    }
  }
  
}