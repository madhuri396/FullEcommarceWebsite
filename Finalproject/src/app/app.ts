import { Component, Input, signal } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/Product-list-component';
import { ProductComponent } from './product-component/product-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from './services/shared.services';
import { Product } from './common/product';
import { Categoryservice } from './services/categoryservice';
import { Category } from './common/category';
import { Productdetailscomponent } from './productdetailscomponent/productdetailscomponent';
import { ChangeDetectorRef } from '@angular/core';
import { Login } from './common/login';
import { Userservice } from './services/userservice';
import { OnInit } from '@angular/core';
import {Cartstateservice} from './services/cartstateservice';
import { Subscription } from 'rxjs';
import { Cartcomponent } from './cartcomponent/cartcomponent';
import { Cartservice } from './services/cartservice';
import { Registercomponent } from './registercomponent/registercomponent';
import { ReactiveFormsModule } from '@angular/forms';
import { CartSidebar } from './cart-sidebar/cart-sidebar';
import { OrdersListComponent } from './order-list-component/order-list-component';
import { PersonalInfoComponent } from './personal-info-component/personal-info-component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit {
  protected readonly title = signal('example-app');
  isSidebarOpen = false;
sear: string = '';
products:Product[] = [];
categories:Category[] = [];
UserData:Login | null = null;
isLoggedIn = false;
showProfileMenu = false;

cartCount: number = 0;
cartTotal: number = 0
  

  

constructor(private sharedService: SharedService,private categoryservice:Categoryservice, private route:Router,private userServ:Userservice,private cartState: Cartstateservice,private cartservice:Cartservice) {}

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}
activeCategory: string | null = null;

toggleSubmenu(category: string) {
  this.activeCategory = this.activeCategory === category ? null : category;
}

onSearchChange() {
  if (this.sear.trim()) {
    this.sharedService.emitSearchTerm(this.sear);
    this.route.navigate(['/products']);
  }
}
category(){
  this.categoryservice.getCategories().subscribe(
    data => { 
      this.categories = data;
      console.log('Categories loaded:', this.categories);
    },
    error => {
      console.error('Error loading categories:', error);
    } 
  );  

}
// searchQuery = '';

//   onSearchChange(term: string) {
//     this.searchQuery = term;
//     // this is used to pass search value to product list component directly
//   }




ngOnInit() {
  this.userServ.user$.subscribe(user => {
    this.UserData = user;
    this.isLoggedIn = !!user;
    if (user?.id) {
      this.loadCartSummary(user.id);
     
    }
  });

  this.cartState.refresh$.subscribe(() => {
    if (this.UserData?.id) {
      this.loadCartSummary(this.UserData.id);
    }
  });
}

loadCartSummary(userId: number) {
  this.cartservice.getTotalCost(userId).subscribe(cost => this.cartTotal = cost);
  this.cartservice.getTotalQuantity(userId).subscribe(qty => this.cartCount = qty);
}

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  showPersonalInfo() {
    console.log('User Details:', this.UserData);
    // Add route or modal logic here if needed
  }

  logout() {
    this.userServ.clearUser();
    this.isLoggedIn = false;
    this.UserData = null;
    this.showProfileMenu = false;
  }

  goToCart() {
    if (this.isLoggedIn) {
      this.route.navigate(['/cart']);
    } else {
      alert('Please log in to view your cart.');
    }
  }
}
