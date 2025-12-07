import { IEventRepository } from "@/domains/dashboard/interfaces/event-repository.interface";
import {
  IEventService,
  ServiceResult,
} from "@/domains/dashboard/interfaces/event-service.interface";
import { IEventValidator } from "@/domains/dashboard/interfaces/event-validator.interface";
import {
  DatabaseError,
  NotFoundError,
  retryAsync,
  tryCatch,
} from "@/lib/error-utils";
import { ILogger } from "@/lib/interfaces/logger.interface";
import { TEventData } from "@/models/show/show";
import { User } from "better-auth";

/**
 * Events Service with Dependency Injection
 *
 * Orchestrates event operations using injected dependencies.
 * Follows SOLID principles for better testability and maintainability.
 */
export class EventsServices implements IEventService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly validator: IEventValidator,
    private readonly logger: ILogger
  ) {}

  async create(
    event: TEventData,
    user: User
  ): Promise<ServiceResult<TEventData>> {
    // Validate input
    const validation = this.validator.validateCreate(event, user.id!);
    if (!validation.isValid) {
      const firstError = validation.errors[0];
      this.logger.error(firstError, "EventsServices.create");
      return {
        data: null,
        status: 400,
        error: firstError.message,
      };
    }

    // Create event with retry logic
    const result = await tryCatch(
      retryAsync(() => this.eventRepository.create(event, user.id!), {
        maxRetries: 2,
        baseDelay: 500,
      })
    );

    if (!result.success) {
      this.logger.error(result.error, "EventsServices.create");
      return {
        data: null,
        status: 500,
        error: result.error.message,
      };
    }

    return {
      data: result.data || null,
      status: 200,
    };
  }

  async getAll(): Promise<ServiceResult<TEventData[]>> {
    const result = await tryCatch(
      retryAsync(() => this.eventRepository.findAll(), {
        maxRetries: 2,
        baseDelay: 500,
      })
    );

    if (!result.success) {
      this.logger.error(result.error, "EventsServices.getAll");
      const dbError = new DatabaseError("Failed to fetch events", result.error);
      return {
        data: [],
        status: 500,
        error: dbError.message,
      };
    }

    return {
      data: result.data || [],
      status: 200,
    };
  }

  async getById(id: string): Promise<ServiceResult<TEventData>> {
    // Validate ID
    const validation = this.validator.validateId(id);
    if (!validation.isValid) {
      return {
        data: null,
        status: 400,
        error: validation.errors[0].message,
      };
    }

    const result = await tryCatch(
      retryAsync(() => this.eventRepository.findById(id), {
        maxRetries: 2,
        baseDelay: 500,
      })
    );

    if (!result.success) {
      this.logger.error(result.error, "EventsServices.getById");
      const dbError = new DatabaseError("Failed to fetch event", result.error);
      return {
        data: null,
        status: 500,
        error: dbError.message,
      };
    }

    return {
      data: result.data || null,
      status: 200,
    };
  }

  async update(event: TEventData): Promise<ServiceResult<TEventData>> {
    // Validate input
    const validation = this.validator.validateUpdate(event);
    if (!validation.isValid) {
      const firstError = validation.errors[0];
      this.logger.error(firstError, "EventsServices.update");
      return {
        data: null,
        status: 400,
        error: firstError.message,
      };
    }

    const result = await tryCatch(
      retryAsync(() => this.eventRepository.update(event), {
        maxRetries: 2,
        baseDelay: 500,
        retryCondition: (error: any) => {
          // Don't retry on validation errors (P2025 = record not found)
          if (error.code === "P2025") return false;
          return true;
        },
      })
    );

    if (!result.success) {
      this.logger.error(result.error, "EventsServices.update");

      // Handle specific Prisma errors
      if ((result.error as any).code === "P2025") {
        const notFoundError = new NotFoundError("Event");
        return {
          data: null,
          status: 404,
          error: notFoundError.message,
        };
      }

      const dbError = new DatabaseError("Failed to update event", result.error);
      return {
        data: null,
        status: 500,
        error: dbError.message,
      };
    }

    return {
      data: result.data || null,
      status: 200,
    };
  }

  async delete(id: string): Promise<ServiceResult<void>> {
    // Validate ID
    const validation = this.validator.validateId(id);
    if (!validation.isValid) {
      return {
        status: 400,
        error: validation.errors[0].message,
      };
    }

    const result = await tryCatch(
      retryAsync(() => this.eventRepository.delete(id), {
        maxRetries: 2,
        baseDelay: 500,
        retryCondition: (error: any) => {
          // Don't retry on validation errors (P2025 = record not found)
          if (error.code === "P2025") return false;
          return true;
        },
      })
    );

    if (!result.success) {
      this.logger.error(result.error, "EventsServices.delete");

      // Handle specific Prisma errors
      if ((result.error as any).code === "P2025") {
        const notFoundError = new NotFoundError("Event");
        return {
          status: 404,
          error: notFoundError.message,
        };
      }

      const dbError = new DatabaseError("Failed to delete event", result.error);
      return {
        status: 500,
        error: dbError.message,
      };
    }

    return { status: 200 };
  }
}
