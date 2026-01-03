import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tbm-pi-os-info',
  imports: [],
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

  ngOnInit(): void{
    this.osInfo.platform = navigator.platform;
    this.osInfo.userAgent = navigator.userAgent;
    this.osInfo.cpuCores = navigator.hardwareConcurrency || 0;
    this.osInfo.memoryGB =
      (navigator as any).deviceMemory
        ? `${(navigator as any).deviceMemory} GB`
        : 'Not supported';
  }
}
