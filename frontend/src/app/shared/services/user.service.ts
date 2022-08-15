import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { URL_DB } from '../urls';

const URL_USERS = `${URL_DB}/users`;

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get(`${URL_USERS}?email=${email}`)
      .pipe(map((user: any) => (user[0] ? user[0] : undefined)));
  }

  getUserById(id: number): Observable<Object> {
    return this.http.get(`${URL_USERS}${id}`);
  }
  createUser(user: User): Observable<Object> {
    return this.http.post(`${URL_USERS}`, user);
  }
  getUsers(): Observable<Object[]> {
    return this.http.get<Object[]>(`${URL_USERS}`);
  }
}
