import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cart } from '../common/cart';
import { Cartadd } from '../common/cartadd';
@Injectable({
  providedIn: 'root'
})
export class Cartstateservice {
  private refreshTrigger = new BehaviorSubject<boolean>(false);
  refresh$ = this.refreshTrigger.asObservable();
  private cartDataSubject = new BehaviorSubject<Cartadd[]>([]);
cartData$ = this.cartDataSubject.asObservable();
 private cartDataSubject1 = new BehaviorSubject<Cart[]>([]);
cartData1$ = this.cartDataSubject.asObservable();

// Replace cart with entire cart array
updateCart(cartItems: Cartadd[]) {
  this.cartDataSubject.next(cartItems);
}

// Optional: add a single item
addItem(item: Cartadd) {
  const currentItems = this.cartDataSubject.getValue();
  currentItems.push(item);
  this.cartDataSubject.next([...currentItems, item]);
}
removeItem(itemId: number) {
    const updated = this.cartDataSubject1.getValue().filter(item => item.itemId !== itemId);
    this.cartDataSubject1.next(updated);
  }
removeProdItem(productId: number) {
  const updated = this.cartDataSubject1.getValue().filter(item => item.productId !== productId);
  this.cartDataSubject1.next(updated);
}
removeMultipleByProductIds(productIds: number[]) {
  const updated = this.cartDataSubject1.getValue().filter(
    item => !productIds.includes(item.productId)
  );
  this.cartDataSubject1.next(updated);
}
syncCart(cart: Cart[]) {
  this.cartDataSubject1.next(cart);
}



//   // Get total count and total cost
//   getCartSummary(): { count: number; total: number } {
//     const items = this.cartDataSubject.getValue();
//     const count = items.length;
//     const total = items.reduce((sum, item) => sum + item.totalCost, 0);
//     return { count, total };
//   }
// getTotalCost(): Observable<number> {
//     return this.cartData1$.pipe(
//       map(items => items.reduce((sum, item) => sum + item.price * item.quantity, 0))
//     );
//   }

//   getTotalCount(): Observable<number> {
//     return this.cartItems$.pipe(
//       map(items => items.reduce((count, item) => count + item.quantity, 0))
//     );
//   }

 clearCart() {
    this.cartDataSubject.next([]);
  }

// Trigger refresh
triggerRefresh() {
  this.refreshTrigger.next(true);
}

}
