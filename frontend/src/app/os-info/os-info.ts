import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { HealthStatus, Metrics, MetricsService } from '../services/metricsservice';
import { Spinner } from '../spinner/spinner';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'tbm-pi-os-info',
  imports: [DatePipe, DecimalPipe, Spinner],
  templateUrl: './os-info.html',
  styleUrls: ['./os-info.scss'],
})
export class OsInfo implements OnInit {

  protected readonly metricsService = inject(MetricsService);

  osInfo = {
    platform: '',
    userAgent: '',
  };

  health: HealthStatus = { status: "UNKNOWN", timestamp: '' };
  metrics: Metrics | null = null;
  loading = signal<boolean>(true);



  ngOnInit(): void {
    this.osInfo.platform = navigator.platform;
    this.osInfo.userAgent = navigator.userAgent;

    forkJoin({
      health: this.metricsService.getHealth(),
      metrics: this.metricsService.getMetrics()
    }).subscribe({
      next: ({ health, metrics }) => {
        this.health = {
          ...health,
          status: health.status.toUpperCase()
        };
        this.metrics = metrics;
        this.loading.set(false);
      },
      error: () => {
        this.health = { status: 'DOWN', timestamp: new Date().toISOString() };
        this.metrics = null;
        this.loading.set(false);
      }
    });
  }
}
