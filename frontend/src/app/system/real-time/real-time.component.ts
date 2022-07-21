import { Component, OnInit } from '@angular/core';
import { cntStatuses } from '../shared/models/cntStatuses.model';
import { ItemReport } from '../shared/models/data-report.model';
import { Report } from '../shared/models/report.model';
import { Technic } from '../shared/models/technic.model';
import { CompleteReportService } from '../shared/services/complete-report.service';
import { IotService } from '../shared/services/iot.service';
import { TechnicService } from '../shared/services/technic.service';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss'],
})
export class RealTimeComponent implements OnInit {
  default: cntStatuses[] = [
    {
      name: 'Свободна',
      text: 'Свободных в резерве: ',
      link: '/system/technics',
    },
    {
      name: 'Работает',
      text: 'Машин работает на нормальных оборотах: ',
      link: '/system/technics',
    },
    {
      name: 'Перегрузка',
      text: 'Машин работает на предельных оборотах: ',
      link: '/system/technics',
    },
  ];
  statuses: cntStatuses[] = [];
  reportRows: ItemReport[] = [];
  constructor(
    private iotService: IotService,
    private completeReport: CompleteReportService
  ) {
    this.iotService.techUpdate.subscribe(() => {
      this.initStatuses();
      this.createRecords();
    });
  }

  initStatuses() {
    this.statuses = [];
    this.reportRows = [];
    this.default.forEach((record) => {
      this.statuses.push({
        name: record.name,
        text: record.text,
        link: record.link,
      });
    });
  }

  ngOnInit(): void {
    this.initStatuses();
    this.createRecords();
  }

  createRecords() {
    this.iotService.getTechnics().subscribe((data) => {
      let reps: any[] = [];

      this.statuses.forEach((structure) => {
        let cnt = (data as Technic[]).filter(
          (item: Technic) => item.status == structure.name
        ).length;

        if (cnt > 0) {
          structure.text += `${cnt}`;
          reps.push({
            text: structure.text,
            link: structure.link,
            query: [structure.name],
          });
          structure.cnt = cnt;
        }
      });

      reps.push({
        text: this.completeReport.koefRun(this.statuses),
        link: '/system/technics',
        query: ['Перегрузка', 'Работает'],
      });
      let date = new Date();

      let conclusions: string[] = [];
      let res = this.completeReport.reserve(conclusions, this.statuses);
      this.statuses = res.statuses;
      conclusions = res.conclusions;
      res = this.completeReport.overload(conclusions, this.statuses);
      this.statuses = res.statuses;
      conclusions = res.conclusions;
      res = this.completeReport.otherPlace(conclusions, this.statuses);
      this.statuses = res.statuses;
      conclusions = res.conclusions;

      this.reportRows.push({
        date: { title: 'Дата', date: date },
        report: { title: 'Отчет', reports: reps },
        conclusion: {
          title: 'Рекомендации',
          conclusions: conclusions,
        },
      });
    });
  }
}
