import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { Cart } from '../common/cart';
import { map } from 'rxjs/operators';
import { ProductDTO } from '../common/product-dto';
@Injectable({
  providedIn: 'root'
})
export class Cartservice {
  apiUrl = "http://localhost:9004/cart/api";

  constructor(private http: HttpClient) {}  
  
  
  getCartItems(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/items/${userId}`);
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, { userId, productId, quantity });
  }

  reduceCartItem(userId: number, productId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/subtract`, { userId, productId, quantity });
  }

  removeCartItem(userId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${userId}/${itemId}`);
  }

  getTotalQuantity(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total/${userId}`);
  }

  getTotalCost(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalCost/${userId}`);
  }

  getProductDetails(id: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.apiUrl}/products/${id}`);
  }

  removeOrderedItems(userId: number, productIds: number[]): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/remove/ordered/${userId}`, {
    body: productIds
  });
}

}



  