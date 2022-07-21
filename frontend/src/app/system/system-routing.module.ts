import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AccountComponent } from './account/account.component';
import { AddTechnicComponent } from './add-technic/add-technic.component';
import { ArchiveComponent } from './archive/archive.component';
import { RealTimeComponent } from './real-time/real-time.component';
import { SystemComponent } from './system.component';
import { TechnicComponent } from './technic/technic.component';
import { TechnicsComponent } from './technics/technics.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RealTimeComponent,
      },
      { path: 'account', component: AccountComponent },
      { path: 'technics', component: TechnicsComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'technic', component: TechnicComponent },
      { path: 'add-technic', component: AddTechnicComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
