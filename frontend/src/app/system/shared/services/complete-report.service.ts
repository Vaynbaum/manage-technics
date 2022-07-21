import { Injectable } from '@angular/core';
import { cntStatuses } from '../models/cntStatuses.model';
enum TypeTech {
  Free,
  Run,
  Overload,
}

@Injectable()
export class CompleteReportService {
  constructor() {}

  reserve(conclusions: string[], statuses: cntStatuses[]) {
    let strConclusion = 'Оставить в резерве:';
    let free = statuses[TypeTech.Free].cnt
      ? (statuses[TypeTech.Free].cnt as number)
      : 0;
    if (free > 0) {
      let cnt = Math.round(free * 0.3);
      if (cnt > 0) {
        if (cnt < free) {
          conclusions.push(`${strConclusion} ${cnt}`);
          (statuses[TypeTech.Free].cnt as number) -= cnt;
        } else {
          conclusions.push(`${strConclusion} ${free}`);
          statuses[TypeTech.Free].cnt = 0;
        }
      }
    }
    return { conclusions: conclusions, statuses: statuses };
  }

  otherPlace(conclusions: string[], statuses: cntStatuses[]) {
    let strConclusion = 'Отправить на другой участок:';
    let free = statuses[TypeTech.Free].cnt
      ? (statuses[TypeTech.Free].cnt as number)
      : 0;

    if (free > 0) {
      conclusions.push(`${strConclusion} ${free}`);
    }
    return { conclusions: conclusions, statuses: statuses };
  }

  koefRunWithoutStr(statuses: cntStatuses[]) {
    let overload = statuses[TypeTech.Overload].cnt
      ? (statuses[TypeTech.Overload].cnt as number)
      : 0;
    let run = statuses[TypeTech.Run].cnt
      ? (statuses[TypeTech.Run].cnt as number)
      : 0;
    let free = statuses[TypeTech.Free].cnt
      ? (statuses[TypeTech.Free].cnt as number)
      : 0;
    let all = overload + run + free;
    return ((overload + run) / all) * 100;
  }

  koefRun(statuses: cntStatuses[]) {
    let overload = statuses[TypeTech.Overload].cnt
      ? (statuses[TypeTech.Overload].cnt as number)
      : 0;
    let run = statuses[TypeTech.Run].cnt
      ? (statuses[TypeTech.Run].cnt as number)
      : 0;
    let free = statuses[TypeTech.Free].cnt
      ? (statuses[TypeTech.Free].cnt as number)
      : 0;

    let all = overload + run + free;
    return `Задействованных машин: ${((overload + run) / all) * 100}%`;
  }

  overload(conclusions: string[], statuses: cntStatuses[]) {
    let strConclusion = 'Отправить для разгрузки процесса:';
    let cnt = statuses[TypeTech.Overload].cnt
      ? (statuses[TypeTech.Overload].cnt as number)
      : 0;
    let free = statuses[TypeTech.Free].cnt
      ? (statuses[TypeTech.Free].cnt as number)
      : 0;

    if (cnt > 0 && free) {
      if (cnt < free) {
        conclusions.push(`${strConclusion} ${cnt}`);
        (statuses[TypeTech.Free].cnt as number) -= cnt;
      } else {
        conclusions.push(`${strConclusion} ${statuses[TypeTech.Free].cnt}`);
        statuses[TypeTech.Free].cnt = 0;
      }
    }
    return { conclusions: conclusions, statuses: statuses };
  }
}
