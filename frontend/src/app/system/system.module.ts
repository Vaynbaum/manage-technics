import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { RealTimeComponent } from './real-time/real-time.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { InfoProfileComponent } from './shared/components/info-profile/info-profile.component';
import { LinkComponent } from './shared/components/link/link.component';
import { TechnicsComponent } from './technics/technics.component';
import { ArchiveComponent } from './archive/archive.component';
import { ReportComponent } from './shared/components/report/report.component';
import { CompleteReportService } from './shared/services/complete-report.service';
import { ArchiveService } from './shared/services/archive.service';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { TechnicComponent } from './technic/technic.component';
import { AddTechnicComponent } from './add-technic/add-technic.component';

@NgModule({
  declarations: [
    SystemComponent,
    AccountComponent,
    HeaderComponent,
    FooterComponent,
    RealTimeComponent,
    InfoProfileComponent,
    LinkComponent,
    TechnicsComponent,
    ArchiveComponent,
    ReportComponent,
    DropdownDirective,
    TechnicComponent,
    AddTechnicComponent,
    // ChartComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    // GoogleChartsModule
  ],
  providers: [CompleteReportService, ArchiveService],
})
export class SystemModule {}
