import { Component } from '@angular/core';
import { Product } from '../common/product';
import { OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-component',
  imports: [FormsModule,CommonModule],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css'
})
export class ProductComponent {
products:Product[] = [];
constructor(private productService: ProductsService, private cdRef: ChangeDetectorRef
) {}
 ngOnInit(): void {
  this.productService.getProducts().subscribe(
    data => { 
      this.products = data;
      console.log('Products loaded:', this.products); 
      //console.log('Product count:', this.products[0].name);
      
      this.cdRef.detectChanges(); 
 })
}
}
