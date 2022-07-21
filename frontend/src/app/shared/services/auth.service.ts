import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
const KEY = 'user';
@Injectable()
export class AuthService {
  public user: User | null = null;
  constructor() {
    const user = localStorage.getItem(KEY);
    if (user) {
      this.user = User.of(JSON.parse(user));
    }
  }

  Login(user: User) {
    this.user = user;
    window.localStorage.setItem(KEY, JSON.stringify(user));
  }
  Logout() {
    this.user = null;
    window.localStorage.removeItem(KEY);
  }
  public get isLoggedIn(): boolean {
    return this.user != null;
  }
}
