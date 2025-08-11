import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../common/login';
import { AddressDTO } from '../common/addressdto';
import { PassChange } from '../common/pass-change';
@Injectable({
  providedIn: 'root'
})
export class Loginregservice {
  private baseUrl = 'http://localhost:8088/api/users';

  constructor(private httpClient: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<Login> {
    const url = `${this.baseUrl}/login`;
    return this.httpClient.post<Login>(url, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  postRegisterData(postData: any): Observable<Login> {
    const url = `${this.baseUrl}/register`;
    return this.httpClient.post<Login>(url, postData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getAddresses(userId: number): Observable<AddressDTO[]> {
    const url = `${this.baseUrl}/Address/${userId}`;
    return this.httpClient.get<AddressDTO[]>(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  postAddress(userId: number, address: AddressDTO): Observable<AddressDTO> {
    const url = `${this.baseUrl}/AddAddress/${userId}`;
    return this.httpClient.post<AddressDTO>(url, address, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getAddressById(userId: number,addressId: number): Observable<AddressDTO> {
    const url = `${this.baseUrl}/Address/${userId}/${addressId}`;
    return this.httpClient.get<AddressDTO>(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateAddress(userId: number, addressId: number, address: AddressDTO): Observable<AddressDTO> {
    const url = `${this.baseUrl}/EditAddress/${userId}/${addressId}`;
    return this.httpClient.put<AddressDTO>(url, address, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
 
  deleteAddress(userId: number, addressId: number): Observable<void> {
    const url = `${this.baseUrl}/DeleteAddress/${userId}/${addressId}`;
    return this.httpClient.delete<void>(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updatePassword(userdt: PassChange): Observable<Login> {
  const url = `${this.baseUrl}/UpdatePassword`;
  return this.httpClient.put<Login>(url, userdt, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: false // ✅ Prevents sending cookies
  });
}


  updateProfile(userData: Login): Observable<Login> {
    const url = `${this.baseUrl}/EditProfile`;
    return this.httpClient.put<Login>(url, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}