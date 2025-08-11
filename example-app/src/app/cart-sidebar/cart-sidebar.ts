import { ChangeDetectorRef, Component } from '@angular/core';
import { Useraddressservice } from '../services/useraddressservice'; // Assuming this service provides the default address  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AddressDTO } from '../common/addressdto'; // Adjust the import path as necessary
import { Userservice } from '../services/userservice';

@Component({
  selector: 'app-cart-sidebar',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cart-sidebar.html',
  styleUrl: './cart-sidebar.css'
})
export class CartSidebar implements   OnInit {
 

  constructor(private service: Useraddressservice,private userserv:Userservice,private cdr: ChangeDetectorRef) {}


  selected: AddressDTO | null = null;
  addresses: AddressDTO[] = [];
  newAddress: AddressDTO = {} as AddressDTO;
  changeMode = false;
selectedindex!:number;

  
userId:number=0;
  ngOnInit(): void {
    
    this.userserv.user$.subscribe(user => {
      if(user?.id) {
        this.userId=user.id;
      }
    
    }
    
  ); 
  this.service.selectedAddress$.subscribe(addr => {this.selected = addr;this.selectedindex = this.addresses.findIndex(addr => addr.line1 === this.selected?.line1 && addr.zipCode === this.selected?.zipCode); console.log("Updated address:", addr);
;this.cdr.detectChanges(); });
    this.service.addresses$.subscribe(list => this.addresses = list);
    this.cdr.detectChanges();
  }

  switchAddress(addr: AddressDTO): void {
    this.service.selectAddress(addr);
  }

  addNew(): void {
    this.service.addAddress(this.userId, this.newAddress);
    this.newAddress = {} as AddressDTO;
  }
  onAddressChange(addr: AddressDTO) {
  this.selected = addr;
   console.log('Selected object:', this.selected);

  this.switchAddress(addr); // updates address wherever needed
}

}
