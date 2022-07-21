import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemReport } from '../../models/data-report.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() row: ItemReport | null = null;
  @Input() importantFirst: boolean = false;
  @Input() archive: boolean = false;
  ngOnInit(): void {}

  goto(link?: string, query?: any) {
    this.router.navigate([link], {
      queryParams: {
        mode: query,
        archiveId: this.archive ? this.row?.archiveId : null,
      },
    });
  }
}
