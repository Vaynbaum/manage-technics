import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  phone: string = '8(952)-462-16-55';
  email: string = 'mr.vaynbaum@mail.ru'
  constructor() {}

  ngOnInit(): void {}
}
