import { Component, OnInit } from '@angular/core';

import { Archive } from '../shared/models/archive.model';
import { ArchiveToTechnic } from '../shared/models/archiveToTechnics.model';
import { cntStatuses } from '../shared/models/cntStatuses.model';
import { ItemReport } from '../shared/models/data-report.model';
import { ArchiveService } from '../shared/services/archive.service';
import { CompleteReportService } from '../shared/services/complete-report.service';
// const month = [
//   'Январь',
//   'Февраль',
//   'Март',
//   'Апрель',
//   'Май',
//   'Июнь',
//   'Июль',
//   'Август',
//   'Сентрябрь',
//   'Октябрь',
//   'Ноябрь',
//   'Декабрь',
// ];
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  constructor(
    private archiveService: ArchiveService,
    private completeReport: CompleteReportService
  ) {}
  reportRows: ItemReport[] = [];

  // //@ts-ignore
  // chart: GoogleChart = {
  //   type: ChartType.LineChart,
  //   opt: {
  //     title: 'Соотношение свободных единиц к задействованным',

  //     height: 300,
  //     hAxis: {},
  //     vAxis: {
  //       title: 'Коэффициент',
  //     },
  //   },
  //   data: [],
  // };

  ngOnInit(): void {
    // let cntRecordChart = 0;
    //@ts-ignore
    // this.chart.opt.width = document.querySelector('.chart').offsetWidth - 20;
    // Получили архивы
    this.archiveService.getArchiveById().subscribe((archives) => {
      // Проходим по архивам
      (archives as Archive[]).forEach((archive: Archive) => {
        // Получили технику
        this.archiveService
          .getTechnicsByArchiveId(archive.id as number)
          .subscribe((technics) => {
            let reps: any[] = [];
            let reports = archive.reports as cntStatuses[];
            // Проходим по отчетам архивов
            reports.forEach(
              // Количество разных режимов
              (report: cntStatuses) => {
                let cnt = (technics as ArchiveToTechnic[]).filter(
                  (item: ArchiveToTechnic) => item.status == report.name
                ).length;

                // Добавляем количество к записи
                if (cnt > 0) {
                  report.text += `${cnt}`;
                  reps.push({
                    text: report.text,
                    link: report.link,
                    query: [report.name],
                  });
                  report.cnt = cnt;
                }
              }
            );

            // Коэффициент задействованных машин
            reps.push({
              text: this.completeReport.koefRun(reports),
              link: '/system/technics',
              query: ['Перегрузка', 'Работает'],
            });

            // if (cntRecordChart < 30) {
            //   this.chart.data.push([
            //     `${archive.day}`,
            //     this.completeReport.koefRunWithoutStr(reports),
            //   ]);
            //   this.chart.opt.hAxis.title = month[archive.month];
            // }

            // Рекомендации
            archive.conclusion = [];
            let res = this.completeReport.reserve(archive.conclusion, reports);
            reports = res.statuses;
            archive.conclusion = res.conclusions;

            res = this.completeReport.overload(
              archive.conclusion,
              archive.reports as cntStatuses[]
            );
            reports = res.statuses;
            archive.conclusion = res.conclusions;

            res = this.completeReport.otherPlace(
              archive.conclusion,
              archive.reports as cntStatuses[]
            );
            reports = res.statuses;
            archive.conclusion = res.conclusions;

            this.reportRows.push({
              date: {
                title: 'Дата',
                date: new Date(archive.year, archive.month, archive.day),
              },
              report: {
                title: 'Отчет',
                reports: reps,
              },
              conclusion: {
                title: 'Рекомендации',
                conclusions: archive.conclusion,
              },
              archiveId: archive.id,
            });
          });
      });
      // cntRecordChart += 1;
    });
  }
}
