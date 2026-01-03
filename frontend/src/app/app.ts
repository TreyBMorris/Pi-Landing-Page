import { Component, signal } from '@angular/core';
import { OsDashboard } from './os-dashboard/os-dashboard';
@Component({
  selector: 'app-root',
  imports: [OsDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pi-landing-page');
}
