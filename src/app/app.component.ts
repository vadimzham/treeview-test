import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.styl'
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor() {}
  ngOnInit() {}
}
