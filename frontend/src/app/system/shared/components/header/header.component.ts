import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IotService } from '../../services/iot.service';
type Buttons = {
  text: string;
  hover: boolean;
  link: string;
  queryParams?: object;
};
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private iotService: IotService
  ) {}
  links: Buttons[] = [
    {
      text: 'Архив отчетов',
      hover: false,
      link: '/system/archive',
    },
    {
      text: 'Техника',
      hover: false,
      link: '/system/technics',
    },
  ];

  profileLinks: Buttons[] = [
    {
      text: 'Аккаунт',
      hover: false,
      link: '/system/account',
    },
  ];

  exit: Buttons = {
    text: 'Выход',
    hover: false,
    link: '/auth/login',
  };
  ngOnInit(): void {}

  public get user() {
    return {
      name: `${this.authService.user?.lastname} ${this.authService.user?.firstname}`,
      url: this.authService.user?.url
        ? `http://localhost:3002/${this.authService.user?.url}`
        : null,
    };
  }
  logout() {
    this.authService.Logout();
    this.iotService.clearTechnics();
    this.router.navigate(['/auth/login']);
  }

  goto() {}
}
