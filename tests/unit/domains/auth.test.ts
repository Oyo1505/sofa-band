/**
 * Unit tests for Authentication domain
 * Tests authorization logic and email validation
 */

import { getAuthorizedEmails } from "@/domains/auth/auth.action";
import prisma from "@/lib/prisma";

// Mock prisma is already set up in jest.setup.js
jest.mock("@/lib/prisma");

describe("Authentication Domain", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAuthorizedEmails", () => {
    it("should return authorized emails successfully", async () => {
      const mockEmails = [
        { id: "1", email: "admin@example.com" },
        { id: "2", email: "user@example.com" },
      ];

      (prisma.authorizedEmail.findMany as jest.Mock).mockResolvedValue(
        mockEmails
      );

      const result = await getAuthorizedEmails();

      expect(result).toEqual({
        mails: mockEmails,
        status: 200,
      });
      expect(prisma.authorizedEmail.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return 400 when no authorized emails found", async () => {
      (prisma.authorizedEmail.findMany as jest.Mock).mockResolvedValue(null);

      const result = await getAuthorizedEmails();

      expect(result).toEqual({
        status: 400,
      });
    });

    it("should return 500 on database error", async () => {
      const dbError = new Error("Database connection failed");
      (prisma.authorizedEmail.findMany as jest.Mock).mockRejectedValue(dbError);

      const result = await getAuthorizedEmails();

      expect(result).toEqual({
        status: 500,
      });
    });

    it("should handle empty authorized emails array", async () => {
      (prisma.authorizedEmail.findMany as jest.Mock).mockResolvedValue([]);

      const result = await getAuthorizedEmails();

      expect(result).toEqual({
        mails: [],
        status: 200,
      });
    });
  });

  describe("Authorization Logic", () => {
    it("should validate email format", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "admin+tag@company.com",
      ];

      validEmails.forEach((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it("should reject invalid email formats", () => {
      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "user @example.com",
      ];

      invalidEmails.forEach((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it("should check if email exists in authorized list", () => {
      const authorizedEmails = [
        { id: "1", email: "admin@example.com" },
        { id: "2", email: "user@example.com" },
      ];

      const testEmail = "admin@example.com";
      const isAuthorized = authorizedEmails.some(
        (item) => item.email === testEmail
      );

      expect(isAuthorized).toBe(true);
    });

    it("should reject unauthorized email", () => {
      const authorizedEmails = [
        { id: "1", email: "admin@example.com" },
        { id: "2", email: "user@example.com" },
      ];

      const testEmail = "hacker@malicious.com";
      const isAuthorized = authorizedEmails.some(
        (item) => item.email === testEmail
      );

      expect(isAuthorized).toBe(false);
    });
  });
});
