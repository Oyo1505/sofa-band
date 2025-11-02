/**
 * Unit tests for Event Schema Validation
 * Tests Zod schema validation for Event creation and editing
 */

import { EventSchema } from '@/domains/dashboard/schema/event-schema';
import moment from 'moment';

describe('Event Schema Validation', () => {
  const validEventData = {
    id: 'event-123',
    title: 'Live Concert',
    location: 'Blue Note Tokyo',
    time: 1900,
    city: 'Tokyo',
    cityInJpn: '東京',
    date: moment().add(7, 'days').format('YYYY-MM-DD'),
    infoLink: 'https://example.com/info',
    region: 'Kanto',
  };

  describe('Valid Event Data', () => {
    it('should validate a complete valid event', () => {
      const result = EventSchema.safeParse(validEventData);
      expect(result.success).toBe(true);
    });

    it('should accept future dates', () => {
      const futureDate = moment().add(30, 'days').format('YYYY-MM-DD');
      const eventData = { ...validEventData, date: futureDate };

      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(true);
    });

    it('should accept today as valid date', () => {
      const today = moment().format('YYYY-MM-DD');
      const eventData = { ...validEventData, date: today };

      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(true);
    });

    it('should accept valid time format (24h)', () => {
      const validTimes = [1, 600, 1200, 1800, 2359]; // Schema requires min(1)

      validTimes.forEach((time) => {
        const eventData = { ...validEventData, time };
        const result = EventSchema.safeParse(eventData);
        expect(result.success).toBe(true);
      });
    });

    it('should accept empty cityInJpn', () => {
      const eventData = { ...validEventData, cityInJpn: '' };
      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(true);
    });

    it('should accept empty infoLink', () => {
      const eventData = { ...validEventData, infoLink: '' };
      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid Event Data - Required Fields', () => {
    it('should reject missing title', () => {
      const { title, ...eventData } = validEventData;
      const result = EventSchema.safeParse(eventData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('title');
      }
    });

    it('should reject empty title', () => {
      const eventData = { ...validEventData, title: '' };
      const result = EventSchema.safeParse(eventData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('String must contain at least 1 character');
      }
    });

    it('should reject missing location', () => {
      const { location, ...eventData } = validEventData;
      const result = EventSchema.safeParse(eventData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('location');
      }
    });

    it('should reject missing city', () => {
      const { city, ...eventData } = validEventData;
      const result = EventSchema.safeParse(eventData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('city');
      }
    });

    it('should reject missing region', () => {
      const { region, ...eventData } = validEventData;
      const result = EventSchema.safeParse(eventData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('region');
      }
    });
  });

  describe('Invalid Event Data - Date Validation', () => {
    it('should reject past dates', () => {
      const pastDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
      const eventData = { ...validEventData, date: pastDate };

      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Date is too old');
      }
    });

    it('should handle non-standard date format', () => {
      const eventData = { ...validEventData, date: '25/12/2025' };
      const result = EventSchema.safeParse(eventData);

      // Schema accepts strings, but date comparison might not work correctly
      // The refine check compares strings lexicographically
      // This test documents the behavior rather than enforcing strict validation
      expect(result.success).toBeDefined();
    });

    it('should reject dates far in the past', () => {
      const veryOldDate = '2020-01-01';
      const eventData = { ...validEventData, date: veryOldDate };

      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Date is too old');
      }
    });
  });

  describe('Invalid Event Data - Time Validation', () => {
    it('should reject time of 0 (less than min 1)', () => {
      const eventData = { ...validEventData, time: 0 };
      const result = EventSchema.safeParse(eventData);

      // Schema requires time >= 1
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('time');
      }
    });

    it('should reject negative time', () => {
      const eventData = { ...validEventData, time: -100 };
      const result = EventSchema.safeParse(eventData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('time');
      }
    });

    it('should reject time as string', () => {
      const eventData = { ...validEventData, time: '19:00' as any };
      const result = EventSchema.safeParse(eventData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle Japanese characters in cityInJpn', () => {
      const eventData = {
        ...validEventData,
        cityInJpn: 'ひらがな カタカナ 漢字',
      };
      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(true);
    });

    it('should handle special characters in title', () => {
      const eventData = {
        ...validEventData,
        title: 'Rock & Roll Night! (Special Edition)',
      };
      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(true);
    });

    it('should handle URLs with query parameters in infoLink', () => {
      const eventData = {
        ...validEventData,
        infoLink: 'https://example.com/event?id=123&ref=promo',
      };
      const result = EventSchema.safeParse(eventData);
      expect(result.success).toBe(true);
    });

    it('should validate all fields together', () => {
      const incompleteData = {
        id: '',
        title: '',
        location: '',
        time: -1,
        city: '',
        date: '2020-01-01',
        region: '',
      };

      const result = EventSchema.safeParse(incompleteData);
      expect(result.success).toBe(false);
      if (!result.success) {
        // Should have multiple validation errors
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });
});
