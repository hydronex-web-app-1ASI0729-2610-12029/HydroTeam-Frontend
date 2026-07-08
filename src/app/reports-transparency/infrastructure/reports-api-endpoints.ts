import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Report } from '../domain/model/report.entity';
import { ReportAssembler } from './report-assembler';
import { CreateReportResource, ReportResource, ReportsResponse } from './reports-response';

const baseUrl = environment.databaseProviderApiBaseUrl;
const reportsPath = environment.databaseProviderReportsEndpointPath;

export class ReportsApiEndpoint extends BaseApiEndpoint<Report, ReportResource, ReportsResponse, ReportAssembler> {
  constructor(http: HttpClient) {
    super(http, `${baseUrl}${reportsPath}`, new ReportAssembler());
  }

  getByBuildingId(buildingId: number): Observable<Report[]> {
    return this.http
      .get<ReportsResponse | ReportResource[]>(this.endpointUrl, {
        params: { buildingId },
      })
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? response.map((resource) => this.assembler.toEntityFromResource(resource))
            : this.assembler.toEntitiesFromResponse(response),
        ),
      );
  }

  createReport(resource: CreateReportResource): Observable<Report> {
    return this.http
      .post<ReportResource>(this.endpointUrl, resource)
      .pipe(map((created) => this.assembler.toEntityFromResource(created)));
  }
}
