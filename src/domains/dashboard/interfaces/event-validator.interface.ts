import { TEventData } from "@/models/show/show";
import { ValidationError } from "@/lib/error-utils";

/**
 * Validation result type
 */
export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

/**
 * Event Validator Interface
 *
 * Defines the contract for event validation logic.
 * Separates validation concerns from business logic.
 */
export interface IEventValidator {
  /**
   * Validates event data for creation
   * @param event - Event data to validate
   * @param userId - User ID creating the event
   * @returns Validation result with errors if any
   */
  validateCreate(event: Partial<TEventData>, userId: string): ValidationResult;

  /**
   * Validates event data for update
   * @param event - Event data to validate
   * @returns Validation result with errors if any
   */
  validateUpdate(event: TEventData): ValidationResult;

  /**
   * Validates event ID format
   * @param id - Event ID to validate
   * @returns Validation result with errors if any
   */
  validateId(id: string): ValidationResult;
}
