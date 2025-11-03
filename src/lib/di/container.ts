import { IEventRepository } from "@/domains/dashboard/interfaces/event-repository.interface";
import { IEventService } from "@/domains/dashboard/interfaces/event-service.interface";
import { IEventValidator } from "@/domains/dashboard/interfaces/event-validator.interface";
import { EventValidator } from "@/domains/dashboard/validators/event.validator";
import { EventsServices } from "@/domains/dashboard/services/events";
import { PrismaEventRepository } from "@/lib/data/repositories/prisma-event.repository";
import { ConsoleLogger } from "@/lib/logging/console.logger";
import { ILogger } from "@/lib/interfaces/logger.interface";
import prisma from "@/lib/db";

/**
 * Dependency Injection Container
 *
 * Simple factory pattern for creating and managing service instances.
 * Centralizes dependency configuration and instantiation.
 *
 * Usage:
 * ```typescript
 * const eventService = Container.getEventService();
 * const result = await eventService.create(event, user);
 * ```
 */
export class Container {
  private static eventRepository: IEventRepository | null = null;
  private static eventValidator: IEventValidator | null = null;
  private static logger: ILogger | null = null;
  private static eventService: IEventService | null = null;

  /**
   * Gets or creates the event repository instance
   */
  static getEventRepository(): IEventRepository {
    if (!this.eventRepository) {
      this.eventRepository = new PrismaEventRepository(prisma);
    }
    return this.eventRepository;
  }

  /**
   * Gets or creates the event validator instance
   */
  static getEventValidator(): IEventValidator {
    if (!this.eventValidator) {
      this.eventValidator = new EventValidator();
    }
    return this.eventValidator;
  }

  /**
   * Gets or creates the logger instance
   */
  static getLogger(): ILogger {
    if (!this.logger) {
      this.logger = new ConsoleLogger();
    }
    return this.logger;
  }

  /**
   * Gets or creates the event service instance with all dependencies
   */
  static getEventService(): IEventService {
    if (!this.eventService) {
      this.eventService = new EventsServices(
        this.getEventRepository(),
        this.getEventValidator(),
        this.getLogger()
      );
    }
    return this.eventService;
  }

  /**
   * Resets all instances (useful for testing)
   */
  static reset(): void {
    this.eventRepository = null;
    this.eventValidator = null;
    this.logger = null;
    this.eventService = null;
  }

  /**
   * Sets custom instances (useful for testing with mocks)
   */
  static setEventRepository(repository: IEventRepository): void {
    this.eventRepository = repository;
    // Reset event service to use new repository
    this.eventService = null;
  }

  static setEventValidator(validator: IEventValidator): void {
    this.eventValidator = validator;
    // Reset event service to use new validator
    this.eventService = null;
  }

  static setLogger(logger: ILogger): void {
    this.logger = logger;
    // Reset event service to use new logger
    this.eventService = null;
  }
}
