import { Component, signal } from '@angular/core';
import { OsInfo } from './os-info/os-info'
@Component({
  selector: 'app-root',
  imports: [OsInfo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pi-landing-page');
}
