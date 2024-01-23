import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css'],
})
export class AdminPanelPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.openTab('Users'); //Users - Products
  }

  openTab(tabName: string): void {
    let i: number;
    let tabcontent: HTMLCollectionOf<Element>;
    let tablinks: HTMLCollectionOf<Element>;

    let button = document.querySelector(`[id="${tabName}-Button"]`);
    button?.setAttribute(
      'class',
      (button?.getAttribute('class') || '') + ' active',
    );

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].setAttribute('style', 'display: none;');
    }

    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].setAttribute(
        'class',
        tablinks[i].getAttribute('class')?.replace(' active', '') || '',
      );
    }

    document.getElementById(tabName)?.setAttribute('style', 'display: block;');
    (event?.currentTarget as HTMLElement)?.setAttribute(
      'class',
      ((event?.currentTarget as HTMLElement)?.getAttribute('class') || '') +
        ' active',
    );
  }
}
