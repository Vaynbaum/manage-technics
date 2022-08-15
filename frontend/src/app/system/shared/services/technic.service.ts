import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Technic } from '../models/technic.model';
import { Observable } from 'rxjs';
import { URL_DB } from 'src/app/shared/urls';

const URL_TECHNICS = `${URL_DB}/technics`;

@Injectable()
export class TechnicService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTechnicsByUser() {
    return this.http.get(`${URL_TECHNICS}?userId=${this.authService.user?.id}`);
  }

  getTechnicsByUserByMode(mode: string) {
    return this.http.get(
      `${URL_TECHNICS}?userId=${this.authService.user?.id}&status=${mode}`
    );
  }

  getTechnicsByNumber(number: string) {
    return this.http
      .get(`${URL_TECHNICS}?number=${number}`)
      .pipe(map((technics: any) => (technics[0] ? technics[0] : undefined)));
  }

  createTechnic(technic: Technic): Observable<Object> {
    return this.http.post(`${URL_TECHNICS}`, technic);
  }
}
