import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../common/login';
@Injectable({ providedIn: 'root' })
export class Userservice {
  private userSubject = new BehaviorSubject<Login | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(details: Login) {
    this.userSubject.next(details);
    console
  }

  getUser(): Login | null {
    return this.userSubject.value;
  }
  clearUser() {
    this.userSubject.next(null);
    console.log('User cleared');
  }
}