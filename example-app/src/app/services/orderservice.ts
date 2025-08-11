import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orderrequestdto } from '../common/orderrequestdto';
import { catchError, Observable, throwError } from 'rxjs';
import { Paymentverificationdto } from '../common/paymentverificationdto';

@Injectable({
  providedIn: 'root'
})
export class Orderservice {
  apiUrl = "http://localhost:8082/api/orders";

  constructor(private http: HttpClient) {}  
  placeOrder(orderRequest: Orderrequestdto): Observable<any> {
  return this.http.post(`${this.apiUrl}/place`, orderRequest);
}

verifyPayment(payload: Paymentverificationdto): Observable<any> {
  return this.http.post(`${this.apiUrl}/verify-payment`, payload);
}
 getOrdersByUser(userId: number, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}?page=${page}&size=${size}`).pipe(     
     
      catchError(err => {
      console.error('❌ Failed to fetch orders:', err);
        return throwError(() => err);
      })
    );
  }

  
}
