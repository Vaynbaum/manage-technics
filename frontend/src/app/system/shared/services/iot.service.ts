import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { Technic } from '../models/technic.model';
import { TechnicService } from './technic.service';

const URL_RAND_DATA_IOT = 'http://localhost:3001';

const INTERVAL_UPDATE_DATA = 4000;
const STR_NO_MOVE = 'Свободна';
@Injectable()
export class IotService {
  technics: Technic[] = [];
  @Output() techUpdate: EventEmitter<any> = new EventEmitter();
  timer: any;
  constructor(
    private http: HttpClient,
    private technicService: TechnicService
  ) {}

  addTechnic(technic: Technic) {
    this.technics.push(technic);
  }
  genNewData() {
    // Записываем режимы работы
    let statuses: string[] = [];
    this.technics.forEach((technic) => {
      statuses.push(technic.status as string);
    });
    // Меняем режимы
    this.getStatuses(statuses).subscribe((status) => {
      this.getCoordinates().subscribe((coordinates) => {
        let coords = coordinates as {
          coordinateLatitude: number;
          coordinateLongitude: number;
        }[];
        // Записываем новые статусы
        for (let i = 0; i < this.technics.length; i++) {
          // console.log(coords);
          this.technics[i].coordinateLatitude = coords[i].coordinateLatitude;
          this.technics[i].coordinateLongitude = coords[i].coordinateLongitude;
          this.technics[i].status = (status as string[])[i];
        }
        this.techUpdate.emit('');
      });
    });
  }

  getStatuses(statuses: string[]) {
    // Получаем новые режимы работы
    if (statuses.length == 1) {
      let params = new HttpParams();
      statuses.forEach((status: string) => {
        params = params.append('status', status);
      });

      return this.http.get(`${URL_RAND_DATA_IOT}/one-status`, { params: params });
    } else {
      let params = new HttpParams();
      statuses.forEach((status: string) => {
        params = params.append('statuses', status);
      });
      return this.http.get(`${URL_RAND_DATA_IOT}/statuses`, { params: params });
    }
  }

  getRandCoordinates(count: number) {
    let params = new HttpParams();
    params = params.append('count', count);
    return this.http.get(`${URL_RAND_DATA_IOT}/randcoordinates`, { params: params });
  }

  stopTechnic(id: number) {
    const str_stop = 'Свободна';
    this.technics.forEach((technic: Technic) => {
      if (technic.id == id) {
        technic.status = str_stop;
      }
    });
  }

  clearTechnics() {
    this.technics = [];
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  launcheTechnic(id: number) {
    const str_launch = 'Работает';
    const str_overload = 'Перегрузка';
    let technic = this.technics.find((technic) => technic.id == id);
    if (technic) {
      technic.status = str_launch;
    }
    technic = this.technics.find((technic) => technic.status == str_overload);
    if (technic) {
      technic.status = str_launch;
    }
  }

  getCoordinates() {
    let old_coords: any[] = [];
    this.technics.forEach((technic) => {
      old_coords.push({
        status: technic.status,
        coordinateLatitude: technic.coordinateLatitude,
        coordinateLongitude: technic.coordinateLongitude,
      });
    });
    return this.http.post(`${URL_RAND_DATA_IOT}/coordinates`, old_coords);
  }

  getRandStatuses(count: number) {
    // Получаем рандомные статусы
    let params = new HttpParams();
    params = params.append('count', count);
    return this.http.get(`${URL_RAND_DATA_IOT}/randstatus`, { params: params });
  }

  public getTechnics() {
    return new Observable((observer) => {
      // Если список не пустой
      if (this.technics.length > 0) {
        observer.next(this.technics);
      } else {
        // Получаем список техники из бд по id пользователя
        this.technicService.getTechnicsByUser().subscribe((res) => {
          let technics = res as Technic[];
          // Получаем начальные режимы работы техники
          this.getRandStatuses(technics.length).subscribe((status) => {
            this.getRandCoordinates(technics.length).subscribe((coord) => {
              // Присваиваем статусы техникам
              for (let i = 0; i < technics.length; i++) {
                technics[i].status = (status as string[])[i];
                technics[i].coordinateLatitude = (coord as any[])[
                  i
                ].coordinateLatitude;
                technics[i].coordinateLongitude = (coord as any[])[
                  i
                ].coordinateLongitude;
              }
              // Сохраняем и возвращаем
              this.technics = technics;

              observer.next(this.technics);
            });
          });
        });

        this.timer = setInterval(() => {
          this.genNewData();
        }, INTERVAL_UPDATE_DATA);
      }
    });
  }
}
