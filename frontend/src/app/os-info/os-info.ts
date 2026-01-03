import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tbm-pi-os-info',
  imports: [DatePipe],
  templateUrl: './os-info.html',
  styleUrl: './os-info.scss',
})
export class OsInfo implements OnInit {

  osInfo = {
    platform: '',
    userAgent: '',
    cpuCores: 0,
    memoryGB: 'Unknown'
  };

  status = {
    app: 'RUNNING',
    online: navigator.onLine,
    lastUpdated: new Date(),
  };



  ngOnInit(): void {
    this.osInfo.platform = navigator.platform;
    this.osInfo.userAgent = navigator.userAgent;
    this.osInfo.cpuCores = navigator.hardwareConcurrency || 0;
    this.osInfo.memoryGB =
      (navigator as any).deviceMemory
        ? `${(navigator as any).deviceMemory} GB`
        : 'Not supported';

    window.addEventListener('online', () => this.updateStatus());
    window.addEventListener('offline', () => this.updateStatus());
  }


  updateStatus(): void {
    this.status.online = navigator.onLine;
    this.status.lastUpdated = new Date();
  }
}
