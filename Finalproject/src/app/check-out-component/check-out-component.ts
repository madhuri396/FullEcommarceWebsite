// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-check-out-component',
//   imports: [],
//   templateUrl: './check-out-component.html',
//   styleUrl: './check-out-component.css'
// })
// export class CheckOutComponent {

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orderrequestdto } from '../common/orderrequestdto';
import { Orderservice } from '../services/orderservice';
import { Paymentservice } from '../services/paymentservice';
import { Cartitems } from '../common/cartitems';
import { ProductsService } from '../services/products.service';
import { Product } from '../common/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrichedCartItem } from '../common/enriched-cart-item';
import { forkJoin } from 'rxjs';
import { Cartstateservice } from '../services/cartstateservice';
import { Cartservice } from '../services/cartservice';

@Component({
  selector: 'app-check-out-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './check-out-component.html',
  styleUrl: './check-out-component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: Cartitems[] = [];
  address: any;
  enrichedItems: EnrichedCartItem[] =[];
  userId: number = 0;
  totalAmount: number = 0;
  productDetails: Product | null = null;

  // Assuming you have a ProductService to fetch product details
  constructor(
    private orderService: Orderservice,
    private paymentService: Paymentservice,
    private productService: ProductsService, // Assuming you have a ProductService to fetch product details
    private router: Router,
    private cartStateService: Cartstateservice,
    private cartService :Cartservice
  ) {}

//   ngOnInit(): void {
//     const state = history.state;
//     this.cartItems = state.cartItems || [];
//     this.address = state.address;
//     this.userId = state.userId;
// productDetails: Product= this.productService.getProductById(this.cartItems[0].productId).subscribe(product => {
//       this.productDetails = product;
//     this.totalAmount = this.cartItems.reduce((acc, item) => acc + (item.unitPrice || 0) * item.quantity, 0);
//   }
// ngOnInit(): void {
//   const state = history.state;
//   this.cartItems = state.cartItems || [];
//   this.address = state.address;
//   this.userId = state.userId;

//   // Fetch product details for the first item
//   if (this.cartItems.length > 0) {
//     this.productService.getProductById(this.cartItems[0].productId).subscribe(product => {
//       this.productDetails = product;

//       // Now you can use product.price to calculate totalAmount
//       this.totalAmount = this.cartItems.reduce((acc, item) => {
//         return acc + (product.unitPrice || 0) * item.quantity;
//       }, 0);
//     });
//   }
// }
ngOnInit(): void {
    const state = history.state;
    this.cartItems = state.cartItems || [];
    this.address = state.address;
    this.userId = state.userId;
console.log('Cart items:', this.cartItems);
    console.log('Address:', this.address);
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    const productCalls = this.cartItems.map(item =>
      this.productService.getProductById(item.productId)
    );

    forkJoin(productCalls).subscribe(products => {
      this.enrichedItems = this.cartItems.map((item, index) => ({
        productId: item.productId,
        quantity: item.quantity,
        productName: products[index].name,
        unitPrice: products[index].unitPrice,
        imageUrl: products[index].imageUrl
      }));

      this.totalAmount = this.enrichedItems.reduce(
        (acc, item) => acc + item.unitPrice * item.quantity,
        0
      );
    });
  }

  // confirmOrder(): void {
  //   const orderedProductIds = this.cartItems.map(item => item.productId); // ✅ Declare here


  //   const orderRequest = new Orderrequestdto(
  //     this.userId,
  //     this.cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
  //     this.address.id,
  //     'RAZORPAY'
  //   );

  //   this.orderService.placeOrder(orderRequest).subscribe(orderResponse => {
  //     this.paymentService.initiateRazorpay(
  //       orderResponse.payment.razorpayOrderId,
  //       orderResponse.totalAmount,
  //       orderResponse.orderId,
  //       () => {
  //         orderedProductIds.forEach(productId => {
  //         this.cartStateService.removeProdItem(productId);
  //       });

  //       this.cartStateService.triggerRefresh();
  //       alert('🎉 Order placed successfully!');


  //         this.router.navigate(['/order-confirmation'], {
  //           state: { orderId: orderResponse.orderId }
  //         });
  //       }
  //     );
  //   });
    
  // }
  confirmOrder(): void {
  const orderedProductIds = this.cartItems.map(item => item.productId);

  const orderRequest = new Orderrequestdto(
    this.userId,
    this.cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
    this.address.id,
    'RAZORPAY'
  );

  this.orderService.placeOrder(orderRequest).subscribe(orderResponse => {
    this.paymentService.initiateRazorpay(
      orderResponse.payment.razorpayOrderId,
      orderResponse.totalAmount,
      orderResponse.orderId,
      () => {
        // ✅ Efficient frontend cart cleanup
        this.cartStateService.removeMultipleByProductIds(orderedProductIds);

        // ✅ Backend cart cleanup
        this.cartService.removeOrderedItems(this.userId, orderedProductIds).subscribe();

        this.cartStateService.triggerRefresh();
        alert('🎉 Order placed successfully!');
        this.router.navigate(['/order-confirmation'], {
          state: { orderId: orderResponse.orderId }
        });
      }
    );
  });
}

 cancelOrder(): void {
    this.router.navigate(['/cart']);
  }
}

 