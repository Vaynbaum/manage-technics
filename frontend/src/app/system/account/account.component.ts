import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Technic } from '../shared/models/technic.model';
import { TechnicService } from '../shared/services/technic.service';
enum Ind {
  Post,
  CntTech,
  Email,
}
export type Stat = {
  val?: any;
  str?: string;
};

type DisplayInfo = {
  fullname: string;
  info: Stat[];
  url: string;
};
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  displayUser: DisplayInfo = {
    fullname: '',
    info: [
      { val: '', str: 'Должность' },
      { val: 0, str: 'Единиц техники' },
      { val: '', str: 'Email' },
    ],
    url: '',
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private technicService: TechnicService
  ) {}

  ngOnInit(): void {
    this.technicService.getTechnicsByUser().subscribe((technics) => {
      this.user = this.authService.user;
      this.displayUser.fullname = `${this.user?.lastname} ${this.user?.firstname}`;
      this.displayUser.info[Ind.Post].val = this.user?.post;
      //
      this.displayUser.info[Ind.Email].val = this.user?.email;
      this.displayUser.info[Ind.CntTech].val = (
        technics as Array<Technic>
      ).length;
    });
  }
}
