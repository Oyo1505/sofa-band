/**
 * Logger Interface
 *
 * Defines the contract for logging operations.
 * Allows different logging implementations (console, file, external service).
 */
export interface ILogger {
  /**
   * Logs an error message with optional context
   * @param error - Error object to log
   * @param context - Optional context string for the error
   */
  error(error: Error, context?: string): void;

  /**
   * Logs a warning message
   * @param message - Warning message
   * @param context - Optional context
   */
  warn(message: string, context?: string): void;

  /**
   * Logs an info message
   * @param message - Info message
   * @param context - Optional context
   */
  info(message: string, context?: string): void;

  /**
   * Logs a debug message
   * @param message - Debug message
   * @param context - Optional context
   */
  debug(message: string, context?: string): void;
}
