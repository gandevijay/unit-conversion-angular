import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  dark = false;
  navItems = [
    {name: 'Convert Units', route: '/conv-unit'}
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleFullscreen() {}

  toggleTheme() {}

}
