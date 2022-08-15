import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./shared/guard/auth.guard";
import { AuthService } from "./shared/services/auth.service";
import { UserService } from "./shared/services/user.service";
import { ArchiveService } from "./system/shared/services/archive.service";
import { CompleteReportService } from "./system/shared/services/complete-report.service";
import { IotService } from "./system/shared/services/iot.service";
import { TechnicService } from "./system/shared/services/technic.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AuthModule, AppRoutingModule],
  providers: [
    UserService,
    AuthService,
    TechnicService,
    IotService,
    CompleteReportService,
    ArchiveService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
