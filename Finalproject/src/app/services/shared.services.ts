import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchTermSubject = new Subject<string>();
  searchTerm$ = this.searchTermSubject.asObservable();

  emitSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
}