import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArchiveToTechnic } from '../shared/models/archiveToTechnics.model';
import { Technic } from '../shared/models/technic.model';
import { ArchiveService } from '../shared/services/archive.service';
import { IotService } from '../shared/services/iot.service';
const STR_STOP = 'Свободна';
const STR_RUN = 'Работает';
const STR_OVERLOAD = 'Перегрузка';
const NAME_BUTTON_STOP = 'Остановить';
const NAME_BUTTON_LAUNCH = 'Отправить';

@Component({
  selector: 'app-technic',
  templateUrl: './technic.component.html',
  styleUrls: ['./technic.component.scss'],
})
export class TechnicComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private archiveService: ArchiveService,
    private iotService: IotService
  ) {}
  technic: Technic | null = null;
  enableManage: boolean = false;
  nameButton: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['archiveId'] && params['technicId']) {
        this.archiveService
          .getTechnicByArchiveIdByTechnicId(
            params['archiveId'],
            params['technicId']
          )
          .subscribe((data) => {
            let tech = (data as ArchiveToTechnic[])[0];
            this.technic = new Technic(
              //@ts-ignore
              tech.technic.type,
              //@ts-ignore
              tech.technic.number,
              //@ts-ignore
              tech.technic.userId,
              tech.status,
              tech.coordinateLatitude,
              tech.coordinateLongitude,
              //@ts-ignore
              tech.technic.id
            );
          });
      } else {
        this.getTechRealTime(params);
        this.enableManage = true;
        if (this.technic?.status && this.technic?.status == STR_STOP) {
          this.nameButton = NAME_BUTTON_LAUNCH;
        } else if (this.technic?.status == STR_RUN) {
          this.nameButton = NAME_BUTTON_STOP;
        } else if (this.technic?.status == STR_OVERLOAD) {
          this.nameButton = NAME_BUTTON_STOP;
        }

        this.iotService.techUpdate.subscribe(() => {
          this.getTechRealTime(params);
        });
      }
    });
  }
  joinerURL() {
    return `../../../assets/images/technics/${this.technic?.type}`;
  }
  actionTechnic() {
    if (this.technic?.status && this.technic?.status == STR_STOP) {
      this.iotService.launcheTechnic(this.technic.id as number);
      this.nameButton = NAME_BUTTON_STOP;
    } else if (this.technic?.status == STR_RUN) {
      this.iotService.stopTechnic(this.technic.id as number);
      this.nameButton = NAME_BUTTON_LAUNCH;
    } else if (this.technic?.status == STR_OVERLOAD) {
      this.iotService.stopTechnic(this.technic.id as number);
      this.nameButton = NAME_BUTTON_LAUNCH;
    }
  }
  getTechRealTime(params: Params) {
    this.iotService.getTechnics().subscribe((data) => {
      this.technic = (data as Technic[]).filter(
        (item) => item.id == params['technicId']
      )[0];
    });
  }
}
