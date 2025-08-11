import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Category } from '../common/category';
@Injectable({
  providedIn: 'root'
})
export class Categoryservice {
  
categoryUrl = 'http://localhost:9001/api/product-category';


constructor(private httpClient: HttpClient) { }
getCategories(): Observable<Category[]> {

  return this.httpClient.get<GetResponse>(this.categoryUrl)
      .pipe(
        map(response => response._embedded.productCategory)
      );
}
}
interface GetResponse {
  _embedded: {    
    productCategory: Category[];
  }}