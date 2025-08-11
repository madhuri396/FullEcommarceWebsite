import { Component } from '@angular/core';
import { Product } from '../common/product';
import { OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cartstateservice } from '../services/cartstateservice';
import { SharedService } from '../services/shared.services';
import { SimpleChanges, Input } from '@angular/core';
import { Userservice } from '../services/userservice';
import { Cartservice } from '../services/cartservice';
@Component({
  selector: 'app-product-list',
  imports: [FormsModule,CommonModule,RouterModule,CommonModule,RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
products:Product[] = [];
searchSub: Subscription = new Subscription();
categoryId: number = 0;
showEmptyMessage: boolean = false;

constructor(private productService: ProductsService, private cdRef: ChangeDetectorRef
,private route:ActivatedRoute ,private sharedService: SharedService,private cartserv:Cartservice,private usersev:Userservice,private cartstate:Cartstateservice) {}
 @Input() searchTerm: string =" ";

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['searchTerm']) {
  //     this.handleSearch(changes['searchTerm'].currentValue);
  //   }
  // }// it is used to detect changes in searchTerm input property 

 ngOnInit(): void {
//   this.productService.getProducts().subscribe(
//     data => { 
//       this.products = data;
//       console.log('Products loaded:', this.products); 
      
//       this.cdRef.detectChanges(); 
//       //console.log('Product count:', this.products[0].name);
//  })
this.route.paramMap.subscribe(() => {
  //this.listProducts();  
  //this.getAllProducts();
  this.listProducts();
});
this.searchSub = this.sharedService.searchTerm$.subscribe(term => {
    this.fetchProducts(term);
  });
 

}
getAllProducts(): Product[] {
  this.productService.getProducts().subscribe(
    data => { 
      this.products = data;
      console.log('All products loaded:', this.products);
      this.cdRef.detectChanges();
    }   
  );
  return this.products;
} 

// fetchProducts(term: string) {
//   this.productService.searchProductBystartsWith(term).subscribe(results => {
//     this.products = results;
//   });
// }

// handleSearch(term: string) {
//   this.productService.searchProductBystartsWith(term).subscribe(results => {
//     this.products = results;
//   });
// }// it is used to pass search value to product list component directly from app component
// listProducts(){
//   const hasCategoryId = this.route.snapshot.paramMap.has('id');
//   console.log('Has category ID:', hasCategoryId);
//   if (hasCategoryId) {
//   this.categoryId = +this.route.snapshot.paramMap.get('id')!;
//   console.log('Category ID:', this.categoryId);
//   this.productService.getProductByCategory(this.categoryId).subscribe( 
//       data => {
//         this.products = data;
//         console.log('Products by category loaded:', this.products);
//         this.cdRef.detectChanges(); 
//       }     
//     );
    
//   } else {
//     // this.categoryId=1;
//     this.getAllProducts();
//   }
  
// } 
fetchProducts(term: string) {
  this.showEmptyMessage = false;

  this.productService.searchProductBystartsWith(term).subscribe(results => {
    this.products = results;

    if (results.length === 0) {
      setTimeout(() => {
        this.showEmptyMessage = true;
      }, 2000);
    }
  });
}

listProducts() {
  this.showEmptyMessage = false; // reset before loading

  const hasCategoryId = this.route.snapshot.paramMap.has('id');
  if (hasCategoryId) {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductByCategory(this.categoryId).subscribe(data => {
      this.products = data;
      this.cdRef.detectChanges();

      if (this.products.length === 0) {
        setTimeout(() => {
          this.showEmptyMessage = true;
        }, 2000); // ⏱️ 2-second delay
      }
    });
  } else {
    this.getAllProducts();
  }
}

cart: { [productId: number]: number } = {};

addToCart(product: Product) {
  this.cartserv.addToCart(this.usersev.getUser()?.id || 0, product.id, 1).subscribe(() => {
    this.cartstate.triggerRefresh();
    console.log(`Added ${product.name} to cart.`);
  }, error => {
    console.error(`Failed to add ${product.name} to cart:`, error);
  }

        
  );
  if (this.cart[product.id]) {  
  this.cart[product.id] = 1;
  } else {
    this.cart[product.id] = 1;
  }
}
totalquan:number=1

increaseQuantity(product: Product) {
  this.cartserv.addToCart(this.usersev.getUser()?.id || 0, product.id, 1).subscribe(() => {
   this.totalquan=this.getQuantity(product);
    this.cartstate.triggerRefresh();
     
    console.log(`Increased quantity of ${product.name} in cart.`);
  }, error => {
    console.error(`Failed to increase quantity of ${product.name} in cart:`, error);
  } 
  );

}

decreaseQuantity(product: Product) {
  
    this.cartserv.reduceCartItem(this.usersev.getUser()?.id || 0, product.id, 1).subscribe(() => {
      console.log(`Decreased quantity of ${product.name} in cart.`);
      this.totalquan=this.getQuantity(product);
     
      this.cartstate.triggerRefresh();
       if (this.totalquan <= 0) {
        delete this.cart[product.id];
        this.cartstate.removeItem(product.id);
      }
      
      console.log(`Decreased quantity of ${product.name} in cart.`);
    }, error => {
      console.error(`Failed to decrease quantity of ${product.name} in cart:`, error);
    });
  }


getQuantity(product: Product): number {

  this.cartserv.getCartItems(this.usersev.getUser()?.id || 0).subscribe(cartItems => {
    const item = cartItems.find(item => item.productId === product.id);
    if (item) {
      this.totalquan = item.quantity;
      console.log(`Quantity of ${product.name} in cart:`, this.totalquan);
      return item.quantity;
    } else {
      return 0;
    }
    }); 
     return  0;
  }
 

  
}
