import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArchiveToTechnic } from '../shared/models/archiveToTechnics.model';
import { Technic } from '../shared/models/technic.model';
import { ArchiveService } from '../shared/services/archive.service';
import { IotService } from '../shared/services/iot.service';
import { TechnicService } from '../shared/services/technic.service';

@Component({
  selector: 'app-technics',
  templateUrl: './technics.component.html',
  styleUrls: ['./technics.component.scss'],
})
export class TechnicsComponent implements OnInit {
  titleNames: string[] = ['Тип', 'Номер', 'Статус'];

  technics: Technic[] = [];
  constructor(
    private router: Router,
    private iotService: IotService,
    private route: ActivatedRoute,
    private archiveService: ArchiveService
  ) {}

  getTechnicsFromArchive(params: Params) {
    let archiveId = params['archiveId'];
    this.archiveService
      .getTechnicsByArchiveId(archiveId)
      .subscribe((technics) => {
        let techs: Technic[] = [];
        (technics as ArchiveToTechnic[]).forEach((technic) => {

          techs.push({
            //@ts-ignore
            type: technic.technic.type,
            //@ts-ignore
            number: technic.technic.number,
            //@ts-ignore
            userId: technic.technic.userId,
            status: technic.status,
            coordinateLatitude: technic.coordinateLatitude,
            coordinateLongitude: technic.coordinateLongitude,
            //@ts-ignore
            id: technic.technic.id,
          });
        });
        this.filterTechnics(techs, params);
      });
  }

  filterTechnics(technics: Technic[], params: Params) {
    if (params['mode']) {
      if (Array.isArray(params['mode'])) {
        params['mode'].forEach((mode: string) => {
          (technics as Technic[])
            .filter((technic: Technic) => technic.status == mode)

            .forEach((technic: Technic) => {
              this.technics.push(technic);
            });
        });
      } else {
        this.technics = (technics as Technic[]).filter(
          (technic: Technic) => technic.status == params['mode']
        );
      }
    } else {
      this.technics = technics as Technic[];
    }
  }

  getTechnicsRealTime(params: Params) {
    this.iotService.getTechnics().subscribe((technics) => {
      this.filterTechnics(technics as Technic[], params);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (!params['archiveId']) {
        this.getTechnicsRealTime(params);
      } else {
        this.getTechnicsFromArchive(params);
      }
    });
  }

  joinerURL(type: string) {
    return `../../../assets/images/technics/${type}`;
  }

  goToAdd() {
    this.router.navigate(['system/add-technic']);
  }

  saveState() {
    this.archiveService.saveState();
  }

  goto(id: number | undefined) {
    this.route.queryParams.subscribe((params: Params) => {
      this.router.navigate(['/system/technic'], {
        queryParams: {
          archiveId: params['archiveId'] ? params['archiveId'] : null,
          technicId: id,
        },
      });
    });
  }
}
