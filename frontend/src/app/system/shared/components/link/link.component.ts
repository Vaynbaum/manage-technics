import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input()
  text: string | undefined;
  @Input()
  link: string | undefined;
  @Input()
  reverse: boolean = false;
  @Input()
  queryParams: object | undefined;
  hover: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onHover() {
    this.hover = true;
  }

  onNonHover() {
    this.hover = false;
  }
  onClick() {
    if (this.link) {
      this.router.navigate([this.link], { queryParams: this.queryParams });
    }
  }
}
