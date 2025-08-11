// // // import { Component } from '@angular/core';

// // // @Component({
// // //   selector: 'app-order-detail-component',
// // //   imports: [],
// // //   templateUrl: './order-detail-component.html',
// // //   styleUrl: './order-detail-component.css'
// // // })
// // // export class OrderDetailComponent {

// // // }
// // import { Component, OnInit } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { Order } from '../common/order';
// // import { Cartitems } from '../common/cartitems';
// // import { Orderservice } from '../services/orderservice';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-order-detail-component',
// //   imports: [CommonModule,FormsModule],
// //   templateUrl: './order-detail-component.html',
// //   styleUrl: './order-detail-component.css'
// // })
// // export class OrderDetailComponent implements OnInit {
// //   order!: Order;

// //   constructor(private router: Router, private orderService: Orderservice) {}

// //   ngOnInit(): void {
// //     this.order = history.state.order;
// //     if (!this.order) {
// //       this.router.navigate(['/orders']);
// //     }
// //   }

// //   reorder(): void {
// //     const cartItems: Cartitems[] = this.order.items.map(item => ({
// //       productId: item.productId,
// //       quantity: item.quantity
// //     }));

// //     const orderRequest = {
// //       userId: this.order.userId,
// //       cartItems: cartItems,
// //       addressId: 0, // You can prefill or ask user to select
// //       paymentMethod: 'RAZORPAY'
// //     };

// //     this.orderService.placeOrder(orderRequest).subscribe(order => {
// //       alert('✅ Reorder initiated. Proceeding to payment...');
// //       // Trigger Razorpay flow here
// //     });
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Order } from '../common/order';
// import { Cartitems } from '../common/cartitems';
// import { Orderservice } from '../services/orderservice';

// import { Product } from '../common/product';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { forkJoin, map } from 'rxjs';
// import { ProductsService } from '../services/products.service';

// @Component({
//   selector: 'app-order-detail-component',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './order-detail-component.html',
//   styleUrl: './order-detail-component.css'
// })
// export class OrderDetailComponent implements OnInit {
//   order!: Order;
//   enrichedItems: Array<Cartitems & Product> = [];

//   constructor(
//     private router: Router,
//     private orderService: Orderservice,
//     private productService: ProductsService
//   ) {}

//   ngOnInit(): void {
//     this.order = history.state.order;
//     if (!this.order) {
//       this.router.navigate(['/orders']);
//       return;
//     }

//     const productRequests = this.order.items.map(item =>
//       this.productService.getProductById(item.productId).pipe(
//         map(product => ({ ...item, ...product }))
//       )
//     );

//     forkJoin(productRequests).subscribe({
//       next: enriched => this.enrichedItems = enriched,
//       error: err => {
//         console.error('❌ Failed to fetch product details:', err);
//         alert('⚠️ Some product details could not be loaded.');
//       }
//     });
//   }

//   reorder(): void {
//     const cartItems: Cartitems[] = this.order.items.map(item => ({
//       productId: item.productId,
//       quantity: item.quantity
//     }));

//     const orderRequest = {
//       userId: this.order.userId,
//       cartItems: cartItems,
//       addressId: 0, // You can prefill or ask user to select
//       paymentMethod: 'RAZORPAY'
//     };

//     this.orderService.placeOrder(orderRequest).subscribe(order => {
//       alert('✅ Reorder initiated. Proceeding to payment...');
//       // Trigger Razorpay flow here
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../common/order';
import { Cartitems } from '../common/cartitems';
import { Orderservice } from '../services/orderservice';
import { ProductsService } from '../services/products.service';
import { EnrichedCartItem } from '../common/enriched-cart-item'; // Assuming you have this interface
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-detail-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-detail-component.html',
  styleUrl: './order-detail-component.css'
})
export class OrderDetailComponent implements OnInit {
  order!: Order;
  enrichedItems: EnrichedCartItem[] = [];

  constructor(
    private router: Router,
    private orderService: Orderservice,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.order = history.state.order;
    if (!this.order) {
      this.router.navigate(['/orders']);
      return;
    }

    const productCalls = this.order.items.map(item =>
      this.productService.getProductById(item.productId)
    );

    forkJoin(productCalls).subscribe({
      next: products => {
        this.enrichedItems = this.order.items.map((item, index) => ({
          productId: item.productId,
          quantity: item.quantity,
          productName: products[index].name,
          unitPrice: products[index].unitPrice,
          imageUrl: products[index].imageUrl
        }));
      },
      error: err => {
        console.error('❌ Failed to fetch product details:', err);
        alert('⚠️ Some product details could not be loaded.');
      }
    });
  }

  reorder(): void {
    const cartItems: Cartitems[] = this.order.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    const orderRequest = {
      userId: this.order.userId,
      cartItems: cartItems,
      addressId: 0, // You can prefill or ask user to select
      paymentMethod: 'RAZORPAY'
    };

    this.orderService.placeOrder(orderRequest).subscribe({
      next: newOrder => {
        alert('✅ Reorder initiated. Proceeding to payment...');
        // Trigger Razorpay flow here
      },
      error: err => {
        console.error('❌ Reorder failed:', err);
        alert('⚠️ Unable to place reorder. Please try again.');
      }
    });
  }
}
