import { TEventData } from "@/models/show/show";

/**
 * Event Repository Interface
 *
 * Defines the contract for event data persistence operations.
 * Implementations can use any storage mechanism (Prisma, MongoDB, etc.)
 */
export interface IEventRepository {
  /**
   * Creates a new event in the database
   * @param event - Event data to create
   * @param userId - ID of the user creating the event
   * @returns Created event with generated ID
   */
  create(event: Omit<TEventData, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<TEventData>;

  /**
   * Updates an existing event
   * @param event - Event data to update (must include id)
   * @returns Updated event data
   */
  update(event: TEventData): Promise<TEventData>;

  /**
   * Deletes an event by ID
   * @param id - Event ID to delete
   */
  delete(id: string): Promise<void>;

  /**
   * Finds an event by ID
   * @param id - Event ID to find
   * @returns Event data or null if not found
   */
  findById(id: string): Promise<TEventData | null>;

  /**
   * Retrieves all events
   * @returns Array of all events
   */
  findAll(): Promise<TEventData[]>;
}
