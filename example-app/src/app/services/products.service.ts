import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private apiUrl = 'http://localhost:9001/api/products';
  constructor(private httpClient:HttpClient) { }

getProducts():Observable<Product[]> {
return this.httpClient.get<GetResponse>(this.apiUrl)
    .pipe(
      map(response => response._embedded.product)
    );
  
}
getProductByCategory(id: number): Observable<Product[]> {
  
  const url = `${this.apiUrl}/search/findByCategoryId?id=${id}`;
  console.log('Fetching products for category ID:', url);
  return this.httpClient.get<GetResponse>(url)
    .pipe(
      map(response => response._embedded.product)
    );
}
searchProductBystartsWith(keyword: string): Observable<Product[]> {
  const url = `${this.apiUrl}/search/findByNameContaining?name=${keyword}`;
  console.log('Searching products with keyword:', url);
  return this.httpClient.get<GetResponse>(url)
    .pipe(
      map(response => response._embedded.product)
    );
}   
getProductById(id:number):Observable<Product>{
  return this.httpClient.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      map(response => response
    )
    );}
}





interface GetResponse {
  _embedded: {
    product: Product[];
}
}
