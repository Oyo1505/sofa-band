import { EventsServices } from "@/domains/dashboard/services/events";
import { IEventRepository } from "@/domains/dashboard/interfaces/event-repository.interface";
import { IEventValidator } from "@/domains/dashboard/interfaces/event-validator.interface";
import { ILogger } from "@/lib/interfaces/logger.interface";
import { TEventData } from "@/models/show/show";
import { User } from "better-auth";

/**
 * Unit tests for EventsServices with Dependency Injection
 *
 * Demonstrates how DI makes testing easier with mocks.
 */

describe("EventsServices", () => {
  let eventService: EventsServices;
  let mockRepository: jest.Mocked<IEventRepository>;
  let mockValidator: jest.Mocked<IEventValidator>;
  let mockLogger: jest.Mocked<ILogger>;

  const mockEvent: TEventData = {
    id: "test-id",
    title: "Test Event",
    location: "Test Location",
    city: "Test City",
    cityInJpn: "テスト市",
    region: "Test Region",
    country: "Test Country",
    date: "2024-01-01",
    time: 14,
    infoLink: "https://test.com",
    published: false,
    authorId: "user-id",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUser: User = {
    id: "user-id",
    email: "test@example.com",
    name: "Test User",
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    // Create mock implementations
    mockRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    mockValidator = {
      validateCreate: jest.fn(),
      validateUpdate: jest.fn(),
      validateId: jest.fn(),
    };

    mockLogger = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    };

    // Inject mocks into service
    eventService = new EventsServices(
      mockRepository,
      mockValidator,
      mockLogger
    );
  });

  describe("create", () => {
    it("should create an event successfully", async () => {
      // Arrange
      mockValidator.validateCreate.mockReturnValue({
        isValid: true,
        errors: [],
      });
      mockRepository.create.mockResolvedValue(mockEvent);

      // Act
      const result = await eventService.create(mockEvent, mockUser);

      // Assert
      expect(result.status).toBe(200);
      expect(result.data).toEqual(mockEvent);
      expect(mockValidator.validateCreate).toHaveBeenCalledWith(
        mockEvent,
        mockUser.id
      );
      expect(mockRepository.create).toHaveBeenCalledWith(
        mockEvent,
        mockUser.id
      );
    });

    it("should return validation error when event data is invalid", async () => {
      // Arrange
      const validationError = {
        isValid: false,
        errors: [
          {
            name: "ValidationError",
            message: "Title is required",
            field: "title",
          } as any,
        ],
      };
      mockValidator.validateCreate.mockReturnValue(validationError);

      // Act
      const result = await eventService.create(mockEvent, mockUser);

      // Assert
      expect(result.status).toBe(400);
      expect(result.error).toBe("Title is required");
      expect(mockRepository.create).not.toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should return all events", async () => {
      // Arrange
      const events = [mockEvent];
      mockRepository.findAll.mockResolvedValue(events);

      // Act
      const result = await eventService.getAll();

      // Assert
      expect(result.status).toBe(200);
      expect(result.data).toEqual(events);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });

    it("should handle repository errors", async () => {
      // Arrange
      const error = new Error("Database connection failed");
      mockRepository.findAll.mockRejectedValue(error);

      // Act
      const result = await eventService.getAll();

      // Assert
      expect(result.status).toBe(500);
      expect(result.error).toBeDefined();
      expect(mockLogger.error).toHaveBeenCalledWith(
        error,
        "EventsServices.getAll"
      );
    });
  });

  describe("getById", () => {
    it("should return event by id", async () => {
      // Arrange
      mockValidator.validateId.mockReturnValue({
        isValid: true,
        errors: [],
      });
      mockRepository.findById.mockResolvedValue(mockEvent);

      // Act
      const result = await eventService.getById("test-id");

      // Assert
      expect(result.status).toBe(200);
      expect(result.data).toEqual(mockEvent);
      expect(mockValidator.validateId).toHaveBeenCalledWith("test-id");
      expect(mockRepository.findById).toHaveBeenCalledWith("test-id");
    });

    it("should return 400 for invalid id", async () => {
      // Arrange
      mockValidator.validateId.mockReturnValue({
        isValid: false,
        errors: [
          {
            name: "ValidationError",
            message: "Event ID is required",
            field: "id",
          } as any,
        ],
      });

      // Act
      const result = await eventService.getById("");

      // Assert
      expect(result.status).toBe(400);
      expect(result.error).toBe("Event ID is required");
      expect(mockRepository.findById).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update an event successfully", async () => {
      // Arrange
      mockValidator.validateUpdate.mockReturnValue({
        isValid: true,
        errors: [],
      });
      mockRepository.update.mockResolvedValue(mockEvent);

      // Act
      const result = await eventService.update(mockEvent);

      // Assert
      expect(result.status).toBe(200);
      expect(result.data).toEqual(mockEvent);
      expect(mockValidator.validateUpdate).toHaveBeenCalledWith(mockEvent);
      expect(mockRepository.update).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe("delete", () => {
    it("should delete an event successfully", async () => {
      // Arrange
      mockValidator.validateId.mockReturnValue({
        isValid: true,
        errors: [],
      });
      mockRepository.delete.mockResolvedValue();

      // Act
      const result = await eventService.delete("test-id");

      // Assert
      expect(result.status).toBe(200);
      expect(mockValidator.validateId).toHaveBeenCalledWith("test-id");
      expect(mockRepository.delete).toHaveBeenCalledWith("test-id");
    });
  });
});
