import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

/**
  * Service to call the Health and Metric endpoints
*/

//Constant will be changed later
export const BASE_URL = 'http://localhost:8080'
export interface HealthStatus {
  status: string,
  timestamp: string,
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
