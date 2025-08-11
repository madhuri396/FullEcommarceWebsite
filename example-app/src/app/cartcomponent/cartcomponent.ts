import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Cartservice } from '../services/cartservice';  
import { Cartstateservice } from '../services/cartstateservice';
import { Userservice } from '../services/userservice';
import { Cart } from '../common/cart';
import { Observable } from 'rxjs';
import { ProductDTO } from '../common/product-dto';
import { Login } from '../common/login'; // Assuming Login is defined in common folder
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SharedService } from '../services/shared.services';
//import { Cart } from '../common/cart'; // Assuming this is the correct import for CartItemResponse
import {CartSidebar} from '../cart-sidebar/cart-sidebar';
import { Orderrequestdto } from '../common/orderrequestdto';
import { Orderservice } from '../services/orderservice';
import { Paymentservice } from '../services/paymentservice';
import { Useraddressservice } from '../services/useraddressservice';
import { Cartitems } from '../common/cartitems';
@Component({
  selector: 'app-cartcomponent',
  imports: [FormsModule,CommonModule,RouterModule,CommonModule,RouterModule,RouterLink,CartSidebar],
  templateUrl: './cartcomponent.html',
  styleUrl: './cartcomponent.css'
})
export class Cartcomponent implements OnInit {
  userId: number = 0;
  //router: any;
  constructor(
  private cartService: Cartservice,
  private cartState: Cartstateservice,
  private userService: Userservice,
  private sharedService: SharedService,
  private userAddressService: Useraddressservice,
  private orderService: Orderservice,
  private paymentService: Paymentservice,
  private router: Router
) {}
  cartItems: Cart[] = [];
  selectedCartItems: Cartitems[] = [];
  totalCost: number = 0;  
  totalQuantity: number = 0;
  //userId: number = 0;
  productDetails: ProductDTO | null = null;
  showCartPanel: boolean = false;
ngOnInit() {
  this.userService.user$.subscribe(user => {
    if (user?.id) {
      this.userId = user.id;
      this.loadCart();
      this.cartState.refresh$.subscribe(() => this.loadCart());
    }
  });
 this.sharedService.searchTerm$.subscribe(term => {
    // Do something with the term on cart page, if needed
    console.log('Search term received in CartComponent:', term);
  });


}loadCart() {
    this.cartService.getCartItems(this.userId).subscribe(items => {
      this.cartItems = items;
       this.selectedCartItems = this.cartItems.map(item =>
      new Cartitems(item.productId, item.quantity)
    );
      //this.totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
      console.log('Cart items loaded:', this.cartItems);
    });
    this.cartService.getTotalCost(this.userId).subscribe(cost => this.totalCost = cost);
  }

  increase(item: Cart) {
    this.cartService.addToCart(this.userId, item.productId, 1).subscribe(() => {
      this.cartState.triggerRefresh();
    });
  }

  decrease(item: Cart) {
    this.cartService.reduceCartItem(this.userId, item.productId, 1).subscribe(() => {
      this.cartState.triggerRefresh();
    });
  }

  toggleCartPanel() {
    this.showCartPanel = !this.showCartPanel;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  // placeOrder() {
  //   alert('Order placed!');
  // }
  remove(item: Cart) {
    this.cartService.removeCartItem(this.userId, item.itemId).subscribe(() => {
      this.cartState.triggerRefresh();
    });
  }

// placeOrder(): void {
//   if (this.selectedCartItems.length === 0) {
//     alert("Please select at least one item to place an order.");
//     return;
//   }

//   const selectedAddress = this.userAddressService.getSelectedAddress();
//   if (!selectedAddress) {
//     alert("Please select a delivery address.");
//     return;
//   }

//   const orderRequest: Orderrequestdto = {
//     userId: this.userId,
//     cartItems: this.selectedCartItems,
//     addressId: selectedAddress.id || 0, // Ensure addressId is set
//     paymentMethod: 'RAZORPAY',
    
//   };
// console.log(orderRequest);
//   this.orderService.placeOrder(orderRequest).subscribe(orderResponse => {
//     console.log('Order response:', orderResponse.payment.razorpayOrderId+ ' ' + orderResponse.totalAmount + ' ' + orderResponse.orderId );
//     //const { razorpayOrderId, totalAmount, orderId } = {orderResponse.payment.razorpayOrderId, orderResponse.totalAmount, orderResponse.orderId};
//     //console.log('Order response:', orderResponse);  
//     //console.log('Verifying payment with:', payload);

//    this.paymentService.initiateRazorpay( orderResponse.payment.razorpayOrderId, orderResponse.totalAmount, orderResponse.orderId);
//   });
// }

placeOrder(): void {
  if (this.selectedCartItems.length === 0) {
    alert("Please select at least one item to place an order.");
    return;
  }

  const selectedAddress = this.userAddressService.getSelectedAddress();
  if (!selectedAddress) {
    alert("Please select a delivery address.");
    return;
  }

  this.router.navigate(['/checkout'], {
    state: {
      cartItems: this.selectedCartItems,
      address: selectedAddress,
      userId: this.userId
    }
  });
}

isSelected(item: Cart): boolean {
  return this.selectedCartItems.some(sel => sel.productId === item.productId);
}

toggleSelection(item: Cart, checked: boolean): void {
  if (checked) {
    this.selectedCartItems.push(new Cartitems(item.productId, item.quantity));
  } else {
    this.selectedCartItems = this.selectedCartItems.filter(sel => sel.productId !== item.productId);
  }
}


}
