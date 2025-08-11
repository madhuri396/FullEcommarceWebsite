// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-order-confirmation-component',
//   imports: [],
//   templateUrl: './order-confirmation-component.html',
//   styleUrl: './order-confirmation-component.css'
// })
// export class OrderConfirmationComponent {

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation-component',
  imports: [],
  templateUrl: './order-confirmation-component.html',
  styleUrl: './order-confirmation-component.css'
})
export class OrderConfirmationComponent implements OnInit {
  orderId!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    this.orderId = state.orderId;
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }
}
