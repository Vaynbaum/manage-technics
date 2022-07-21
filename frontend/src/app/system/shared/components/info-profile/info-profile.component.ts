import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss'],
})
export class InfoProfileComponent implements OnInit {
  urlUndefined = '../../../../../assets/images/icon-profile.png';
  @Input()
  fullname: string = '';
  @Input()
  url: string | null = null;
  constructor() {}

  ngOnInit(): void {
    this.url = this.url ? this.url : this.urlUndefined;
  }
}
