import { TEventData } from "@/models/show/show";
import { User } from "better-auth";

/**
 * Service operation result type
 */
export type ServiceResult<T> = {
  data?: T | null;
  status: number;
  error?: string;
};

/**
 * Event Service Interface
 *
 * Defines the contract for event business logic operations.
 * Orchestrates validation, repository calls, and error handling.
 */
export interface IEventService {
  /**
   * Creates a new event with validation and error handling
   * @param event - Event data to create
   * @param user - User creating the event
   * @returns Service result with created event or error
   */
  create(event: TEventData, user: User): Promise<ServiceResult<TEventData>>;

  /**
   * Updates an existing event with validation
   * @param event - Event data to update
   * @returns Service result with updated event or error
   */
  update(event: TEventData): Promise<ServiceResult<TEventData>>;

  /**
   * Deletes an event by ID
   * @param id - Event ID to delete
   * @returns Service result with status
   */
  delete(id: string): Promise<ServiceResult<void>>;

  /**
   * Retrieves an event by ID
   * @param id - Event ID to find
   * @returns Service result with event or error
   */
  getById(id: string): Promise<ServiceResult<TEventData>>;

  /**
   * Retrieves all events
   * @returns Service result with events array
   */
  getAll(): Promise<ServiceResult<TEventData[]>>;
}
