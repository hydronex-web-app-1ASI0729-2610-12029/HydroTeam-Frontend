import { Observable } from 'rxjs';
import { Alert } from '../model/alert.entity';

/**
 * Represents the Alert repository interface.
 */
export interface AlertRepository {
  findActiveByCisternId(cisternId: string): Observable<Alert[]>;
  save(alert: Alert): Observable<Alert>;
}