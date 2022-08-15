import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { URL_DB } from "src/app/shared/url";
import { Archive } from "../models/archive.model";
import { ArchiveToTechnic } from "../models/archiveToTechnics.model";
import { Report } from "../models/report.model";
import { Technic } from "../models/technic.model";
import { IotService } from "./iot.service";

const URL_ARCHIVES = `${URL_DB}/archives`;
const URL_ARCHIVE_TO_TECHNICS = `${URL_DB}/archiveToTechnics`;

@Injectable()
export class ArchiveService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private iotService: IotService
  ) {}

  getArchiveById() {
    return this.http.get(`${URL_ARCHIVES}?userId=${this.authService.user?.id}`);
  }

  getTechnicsByArchiveId(id: number) {
    return this.http.get(
      `${URL_ARCHIVE_TO_TECHNICS}?archiveId=${id}&_expand=technic`
    );
  }

  createArchive(archive: Archive) {
    return this.http.post(`${URL_ARCHIVES}`, archive);
  }

  createTechnicArchive(technic: ArchiveToTechnic) {
    return this.http.post(`${URL_ARCHIVE_TO_TECHNICS}`, technic);
  }

  saveState() {
    let date = new Date();
    const archive = new Archive(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate(),
      //@ts-ignore
      this.authService.user.id as number,
      [
        {
          name: "Свободна",
          text: "Свободных в резерве: ",
          link: "/system/technics",
        } as Report,
        {
          name: "Работает",
          text: "Машин работает на нормальных оборотах: ",
          link: "/system/technics",
        } as Report,
        {
          name: "Перегрузка",
          text: "Машин работает на предельных оборотах: ",
          link: "/system/technics",
        } as Report,
      ]
    );
    this.createArchive(archive).subscribe((archive) => {
      this.iotService.getTechnics().subscribe((technics) => {
        (technics as Technic[]).forEach((technic) => {
          // console.log(technic);
          let newTechn = new ArchiveToTechnic(
            //@ts-ignore
            technic.status,
            technic.coordinateLatitude,
            technic.coordinateLongitude, //@ts-ignore
            archive.id,
            technic.id
          );
          // console.log(newTechn);
          this.createTechnicArchive(newTechn).subscribe(() => {});
        });
      });
    });
  }

  getTechnicByArchiveIdByTechnicId(archiveId: number, technicId: number) {
    return this.http.get(
      `${URL_ARCHIVE_TO_TECHNICS}?archiveId=${archiveId}&technicId=${technicId}&_expand=technic`
    );
  }
}
