import { ILogger } from "@/lib/interfaces/logger.interface";

/**
 * Console Logger
 *
 * Concrete implementation of ILogger using console methods.
 * Suitable for development and server-side logging.
 */
export class ConsoleLogger implements ILogger {
  error(error: Error, context?: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${context ? `[${context}] ` : ""}${error.name}: ${error.message}`;

    console.error(logMessage);

    if (error.stack) {
      console.error(error.stack);
    }
  }

  warn(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${context ? `[${context}] ` : ""}${message}`;
    console.warn(logMessage);
  }

  info(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${context ? `[${context}] ` : ""}${message}`;
    console.info(logMessage);
  }

  debug(message: string, context?: string): void {
    if (process.env.NODE_ENV === "development") {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] ${context ? `[${context}] ` : ""}${message}`;
      console.debug(logMessage);
    }
  }
}
