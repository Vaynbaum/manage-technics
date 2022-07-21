import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
const url = 'http://localhost:3000/users';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get(`${url}?email=${email}`)
      .pipe(map((user: any) => (user[0] ? user[0] : undefined)));
  }

  getUserById(id: number): Observable<Object> {
    return this.http.get(`${url}${id}`);
  }
  createUser(user: User): Observable<Object> {
    return this.http.post(`${url}`, user);
  }
  getUsers(): Observable<Object[]> {
    return this.http.get<Object[]>(`${url}`);
  }
}
