import {Observable} from 'rxjs';
import { Plan } from "../model/plan.entity";

/**
 * PlanRepository contract for domain persistence operations.
 */
export interface PlanRepository {
  /**
   * Retrieves all available subscriptions plans.
   */
  getAllPlan(): Observable<Plan[]>

  /**
   * Finds a specific subscriptions plan by its unique number ID.
   * @param id - The ID of the plan.
   * @returns found plan if exists, in otherwise is null.
   */
  getByIdPlan(id: number): Observable<Plan | null>

  /**
   * Finds a billing plan by name.
   * @param name - The name of the plan.
   * @returns found plan if exists, in otherwise is null.
   */
  getByNamePlan(name: string): Observable<Plan | null>
}
