import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

/**
 * Service to call the Health and Metric endpoints
 */

export const BASE_URL = environment.apiUrl;
export interface HealthStatus {
  status: string;
  timestamp: string;
}
export interface Metrics {
  cpu_logical: number;
  cpu_count: number;
  memory_used_percent: number;
  disk_used_percent: number;
}
@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  protected readonly httpClient = inject(HttpClient);

  private healthUrl = `${BASE_URL}/api/health`;
  private metricsUrl = `${BASE_URL}/api/metrics`;

  getHealth(): Observable<HealthStatus> {
    return this.httpClient.get<HealthStatus>(this.healthUrl);
  }

  getMetrics(): Observable<Metrics> {
    return this.httpClient.get<Metrics>(this.metricsUrl);
  }
}
