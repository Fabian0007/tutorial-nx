import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tutorial-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angularapp';
  creator = 'Fabian Cano';
  template = `<h1>Made by ${this.creator}</h1>`;
}
