import {
  IEventValidator,
  ValidationResult,
} from "@/domains/dashboard/interfaces/event-validator.interface";
import { ValidationError } from "@/lib/error-utils";
import { TEventData } from "@/models/show/show";

/**
 * Event Validator
 *
 * Concrete implementation of IEventValidator.
 * Handles all validation logic for event operations.
 */
export class EventValidator implements IEventValidator {
  validateCreate(event: Partial<TEventData>, userId: string): ValidationResult {
    const errors: ValidationError[] = [];

    if (!event.title || event.title.trim() === "") {
      errors.push(new ValidationError("Title is required", "title"));
    }

    if (!userId || userId.trim() === "") {
      errors.push(new ValidationError("User ID is required", "userId"));
    }

    if (!event.location || event.location.trim() === "") {
      errors.push(new ValidationError("Location is required", "location"));
    }

    if (!event.city || event.city.trim() === "") {
      errors.push(new ValidationError("City is required", "city"));
    }

    if (!event.region || event.region.trim() === "") {
      errors.push(new ValidationError("Region is required", "region"));
    }

    if (!event.date || event.date.trim() === "") {
      errors.push(new ValidationError("Date is required", "date"));
    }

    if (event.time === undefined || event.time === null) {
      errors.push(new ValidationError("Time is required", "time"));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateUpdate(event: TEventData): ValidationResult {
    const errors: ValidationError[] = [];

    if (!event.id || event.id.trim() === "") {
      errors.push(new ValidationError("Event ID is required", "id"));
    }

    if (!event.title || event.title.trim() === "") {
      errors.push(new ValidationError("Title is required", "title"));
    }

    if (!event.location || event.location.trim() === "") {
      errors.push(new ValidationError("Location is required", "location"));
    }

    if (!event.city || event.city.trim() === "") {
      errors.push(new ValidationError("City is required", "city"));
    }

    if (!event.region || event.region.trim() === "") {
      errors.push(new ValidationError("Region is required", "region"));
    }

    if (!event.date || event.date.trim() === "") {
      errors.push(new ValidationError("Date is required", "date"));
    }

    if (event.time === undefined || event.time === null) {
      errors.push(new ValidationError("Time is required", "time"));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateId(id: string): ValidationResult {
    const errors: ValidationError[] = [];

    if (!id || id.trim() === "") {
      errors.push(new ValidationError("Event ID is required", "id"));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
