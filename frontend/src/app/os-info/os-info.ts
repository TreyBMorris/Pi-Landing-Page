import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HealthStatus, Metrics, MetricsService } from '../services/metricsservice';

@Component({
  selector: 'tbm-pi-os-info',
  imports: [DatePipe],
  templateUrl: './os-info.html',
  styleUrl: './os-info.scss',
})
export class OsInfo implements OnInit {

  protected readonly metricsService = inject(MetricsService);

  osInfo = {
    platform: '',
    userAgent: '',
  };

  health: HealthStatus = { status: "UNKNOWN", timestamp: '' };
  metrics: Metrics | null = null;



  ngOnInit(): void {
    this.osInfo.platform = navigator.platform;
    this.osInfo.userAgent = navigator.userAgent;

    this.fetchHealth();
    this.fetchMetrics();

    console.log(this.health);
  }


  fetchHealth(): void {
    this.metricsService.getHealth().subscribe({
      next: (data) => this.health = data,
      error: () => this.health.status = 'DOWN'
    });
  }

  fetchMetrics(): void {
    this.metricsService.getMetrics().subscribe({
      next: (data) => this.metrics = data,
      error: () => this.metrics = null
    });
  }
}
