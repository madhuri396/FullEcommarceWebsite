// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Loginregservice } from './loginregservice'; // Adjust the import path as necessary
// import { AddressDTO } from '../common/addressdto';
// @Injectable({
//   providedIn: 'root'
// })
// export class Useraddressservice {
  
// private defaultAddressSubject = new BehaviorSubject<any | null>(null);
//   private addressesSubject = new BehaviorSubject<AddressDTO[]>([]);
//   private selectedAddressSubject = new BehaviorSubject<AddressDTO | null>(null);

//   addresses$ = this.addressesSubject.asObservable();
//   selectedAddress$ = this.selectedAddressSubject.asObservable();

//   constructor(private loginRegService: Loginregservice) {}

//   getAddress(userId: number): void {
//     this.loginRegService.getAddresses(userId).subscribe({
//      next: list => {
//         this.addressesSubject.next(list);
//         if (list.length) this.selectedAddressSubject.next(list[0]);
//       }
//       ,
//       error: err => console.error('Error fetching addresses:', err)
//     });
//   }

//   addAddress(userId: number, newAddress: AddressDTO): void {
//     this.loginRegService.postAddress(userId, newAddress).subscribe({
  
//       next: saved => {
//         const updatedList = [...this.addressesSubject.getValue(), saved];
//         this.addressesSubject.next(updatedList);
//         this.selectedAddressSubject.next(saved);
//       }
//       ,
//       error: err => console.error('Error adding address:', err)   

//     });
//   }
//   selectAddress(addr: AddressDTO): void {
//     this.selectedAddressSubject.next(addr);
//   }

//   triggerRefresh(){
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Loginregservice } from './loginregservice';
import { AddressDTO } from '../common/addressdto';

@Injectable({
  providedIn: 'root'
})
export class Useraddressservice {
  private addressesSubject = new BehaviorSubject<AddressDTO[]>([]);
  private selectedAddressSubject = new BehaviorSubject<AddressDTO | null>(null);
  //private defaultAddressSubject = new BehaviorSubject<AddressDTO | null>(null);

  addresses$ = this.addressesSubject.asObservable();
  selectedAddress$ = this.selectedAddressSubject.asObservable();
  //defaultAddress$ = this.defaultAddressSubject.asObservable();

  constructor(private loginRegService: Loginregservice) {}

  getAddress(userId: number): void {
    this.loginRegService.getAddresses(userId).subscribe({
     next: list => {
        this.addressesSubject.next(list);
        if (list.length) this.selectedAddressSubject.next(list[0]);
      }
      ,
      error: err => console.error('Error fetching addresses:', err)
    });
  }

  getAddressById(userId:number,addressId: number) {
    return this.loginRegService.getAddressById(userId,addressId);
  }

  addAddress(userId: number, newAddress: AddressDTO) {
    return this.loginRegService.postAddress(userId, newAddress);
  }

  updateAddress(userId: number, addressId: number, updatedAddress: AddressDTO) {
    return this.loginRegService.updateAddress(userId, addressId, updatedAddress);
  }

  selectAddress(addr: AddressDTO): void {
    this.selectedAddressSubject.next(addr);
  }
  getSelectedAddress(): AddressDTO | null {
  return this.selectedAddressSubject.getValue();
}

removeAddress(userId: number, addressId: number): Observable<any> {
  return this.loginRegService.deleteAddress(userId, addressId).pipe(
    tap(() => {
      const updated = this.addressesSubject.getValue().filter(a => a.id !== addressId);
      this.addressesSubject.next(updated);
      if (this.selectedAddressSubject.getValue()?.id === addressId) {
        this.selectedAddressSubject.next(updated[0] || null);
      }
    })
  );
}

  triggerRefresh(userId: number): void {
    this.getAddress(userId); // Re-fetch and update subjects
  }
}
  

  

  