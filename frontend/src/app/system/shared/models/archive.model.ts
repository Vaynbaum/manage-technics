import { Report } from './report.model';

export class Archive {
  constructor(
    public year: number,
    public month: number,
    public day: number,
    public userId: number,
    public reports: Report[],
    public conclusion?: string[],
    public id?: number
  ) {}
}
