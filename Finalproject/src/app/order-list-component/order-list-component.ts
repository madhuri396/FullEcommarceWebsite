// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-order-list-component',
//   imports: [],
//   templateUrl: './order-list-component.html',
//   styleUrl: './order-list-component.css'
// })
// export class OrderListComponent {

// }
import { Component, OnInit } from '@angular/core';
import { Orderservice } from '../services/orderservice';
import { Userservice } from '../services/userservice';
import { Router } from '@angular/router';
import { Order } from '../common/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './order-list-component.html',
  styleUrl: './order-list-component.css'
})
export class OrdersListComponent implements OnInit {
  userId: number = 0;
  orders: Order[] = [];

  constructor(
    private orderService: Orderservice,
    private userService: Userservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if (user?.id) {
        this.userId = user.id;
        this.loadOrders();
      }
    });
  }

  loadOrders(): void {
    this.orderService.getOrdersByUser(this.userId).subscribe(res => {
      this.orders = res.orders;
    });
  }

  viewOrder(order: Order): void {
    this.router.navigate(['/order-detail'], { state: { order } });
  }
}
