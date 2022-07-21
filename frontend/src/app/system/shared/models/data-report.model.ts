import { Report } from './report.model';

export type ItemReport = {
  date: { title: string; date: Date };
  report: {
    title: string;
    reports: Report[];
  };
  conclusion: { title: string; conclusions: string[] };
  archiveId?: number;
};
