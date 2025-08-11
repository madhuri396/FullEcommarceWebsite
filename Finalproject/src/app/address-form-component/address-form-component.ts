// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { AddressDTO } from '../common/addressdto';
// import { Useraddressservice } from '../services/useraddressservice';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { Userservice } from '../services/userservice';

// @Component({
//   selector: 'app-address-form-component',
//   imports: [CommonModule,FormsModule,RouterModule],
//   templateUrl: './address-form-component.html',
//   styleUrl: './address-form-component.css'
// })
// export class AddressFormComponent implements OnInit {
//  userId!: number;
//   @Output() addressAdded = new EventEmitter<AddressDTO>();

//   newAddress: AddressDTO = new AddressDTO();

//   constructor(private userAddressService: Useraddressservice,private userServ:Userservice,private router: Router) {}
// ngOnInit(): void {
//      this.userServ.user$.subscribe(user => {
//       if(user?.id) {
//         this.userId=user.id;
//       }
//      });
// }

//   add(): void {
//     this.userAddressService.addAddress(this.userId, this.newAddress);
//     this.addressAdded.emit(this.newAddress);
//     this.newAddress = new AddressDTO(); // reset form
//     alert('✅ Address added successfully!');
// this.router.navigate(['../']);

//   }

// }
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressDTO } from '../common/addressdto';
import { Useraddressservice } from '../services/useraddressservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Userservice } from '../services/userservice';
import { Location } from '@angular/common';

@Component({
  selector: 'app-address-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './address-form-component.html',
  styleUrls: ['./address-form-component.css']
})
export class AddressFormComponent implements OnInit {
  userId!: number;
  newAddress: AddressDTO = new AddressDTO();
  isEditMode: boolean = false;
  addressId!: number;

  @Output() addressAdded = new EventEmitter<AddressDTO>();

  constructor(
    private userAddressService: Useraddressservice,
    private userServ: Userservice,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userServ.user$.subscribe(user => {
      if (user?.id) {
        this.userId = user.id;
      }
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.addressId = +idParam;
      this.userAddressService.getAddressById(this.userId,this.addressId).subscribe(addr => {
        this.newAddress = addr;
      });
    }
  }
// add(): void {
//     this.userAddressService.addAddress(this.userId, this.newAddress);
//     this.addressAdded.emit(this.newAddress);
//     this.newAddress = new AddressDTO(); // reset form
//     alert('✅ Address added successfully!');
//  this.router.navigate(['/addresses']);
// }

add(): void {
  this.userAddressService.addAddress(this.userId, this.newAddress).subscribe({
  next: (response) => {
    console.log('✅ Address added:', response);
    this.addressAdded.emit(response);
    this.newAddress = new AddressDTO(); // reset form
    alert('✅ Address added successfully!');
    this.router.navigate(['/addresses']);
  },
  error: (err) => {
    console.error('❌ Failed to add address:', err);
    alert('Failed to add address. Please try again.');
  }
});
  }
  save(): void {
    if (this.isEditMode) {
      this.userAddressService.updateAddress(this.userId, this.addressId, this.newAddress).subscribe(() => {
        alert('✅ Address updated successfully!');
        this.router.navigate(['/addresses']);
      });
    } else {
      this.userAddressService.addAddress(this.userId, this.newAddress).subscribe(() => {
        this.addressAdded.emit(this.newAddress);
        console.log('Address added:', this.newAddress);
        this.newAddress = new AddressDTO(); // reset form
        alert('✅ Address added successfully!');
        this.router.navigate(['/addresses']);
      });
    }
  }

  goback(){
  this.location.back(); 
  }
}