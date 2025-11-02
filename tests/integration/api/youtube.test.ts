/**
 * Integration tests for YouTube API Route
 * Tests API error handling, validation, and response formatting
 */

import { NextRequest } from 'next/server';
import { GET } from '@/app/api/youtube/videos/route';

// Mock fetch globally
global.fetch = jest.fn();

describe('YouTube API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.YOUTUBE_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Channel Action', () => {
    const createRequest = (action: string) => {
      const url = `http://localhost:3000/api/youtube/videos?action=${action}`;
      return new NextRequest(url);
    };

    it('should fetch channel info successfully', async () => {
      const mockChannelResponse = {
        items: [
          {
            contentDetails: {
              relatedPlaylists: {
                uploads: 'UU8xzsABKxgXbJYLhxTn8GpQ',
              },
            },
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockChannelResponse,
      });

      const request = createRequest('channel');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.playlistId).toBe('UU8xzsABKxgXbJYLhxTn8GpQ');
      expect(data.timestamp).toBeDefined();
    });

    it('should handle channel not found', async () => {
      const mockEmptyResponse = { items: [] };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockEmptyResponse,
      });

      const request = createRequest('channel');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error.message).toContain('Channel not found');
    });

    it('should handle missing upload playlist', async () => {
      const mockInvalidResponse = {
        items: [
          {
            contentDetails: {
              relatedPlaylists: {},
            },
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockInvalidResponse,
      });

      const request = createRequest('channel');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error.message).toContain('upload playlist not found');
    });

    it('should handle YouTube API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        text: async () => 'API quota exceeded',
      });

      const request = createRequest('channel');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toBeDefined();
    });

    it('should handle timeout errors', async () => {
      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 100)
          )
      );

      const request = createRequest('channel');
      const response = await GET(request);

      expect(response.status).toBeGreaterThanOrEqual(500);
    });
  });

  describe('Playlist Action', () => {
    const createPlaylistRequest = (playlistId: string) => {
      const url = `http://localhost:3000/api/youtube/videos?action=playlist&playlistId=${playlistId}`;
      return new NextRequest(url);
    };

    it('should fetch playlist videos successfully', async () => {
      const mockPlaylistResponse = {
        items: [
          {
            snippet: {
              title: 'Test Video 1',
              description: 'Description 1',
              resourceId: {
                videoId: 'video123',
              },
            },
          },
          {
            snippet: {
              title: 'Test Video 2',
              description: 'Description 2',
              resourceId: {
                videoId: 'video456',
              },
            },
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockPlaylistResponse,
      });

      const request = createPlaylistRequest('UU8xzsABKxgXbJYLhxTn8GpQ');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.videos).toHaveLength(2);
      expect(data.data.videos[0].videoId).toBe('video123');
      expect(data.data.videos[0].title).toBe('Test Video 1');
    });

    it('should handle empty playlist', async () => {
      const mockEmptyPlaylist = {
        items: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockEmptyPlaylist,
      });

      const request = createPlaylistRequest('UU8xzsABKxgXbJYLhxTn8GpQ');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.videos).toEqual([]);
    });

    it('should validate playlist ID format', async () => {
      const invalidPlaylistIds = [
        'invalid id with spaces',
        '../../../etc/passwd',
        '<script>alert("xss")</script>',
      ];

      for (const invalidId of invalidPlaylistIds) {
        const request = createPlaylistRequest(invalidId);
        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error.message).toContain('Invalid playlist ID');
      }
    });

    it('should require playlist ID parameter', async () => {
      const url = `http://localhost:3000/api/youtube/videos?action=playlist`;
      const request = new NextRequest(url);
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.message).toContain('Playlist ID is required');
    });

    it('should handle playlist not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Playlist not found',
      });

      const request = createPlaylistRequest('UU_invalid_playlist');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error.message).toContain('not found');
    });

    it('should handle API quota exceeded', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        text: async () => 'Quota exceeded',
      });

      const request = createPlaylistRequest('UU8xzsABKxgXbJYLhxTn8GpQ');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error.message).toContain('quota exceeded');
    });

    it('should handle YouTube API error responses', async () => {
      const mockErrorResponse = {
        error: {
          code: 400,
          message: 'Bad Request',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockErrorResponse,
      });

      const request = createPlaylistRequest('UU8xzsABKxgXbJYLhxTn8GpQ');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.message).toContain('Bad Request');
    });
  });

  describe('Validation', () => {
    it('should require action parameter', async () => {
      const url = `http://localhost:3000/api/youtube/videos`;
      const request = new NextRequest(url);
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.message).toContain('Action parameter is required');
    });

    it('should reject invalid action', async () => {
      const url = `http://localhost:3000/api/youtube/videos?action=invalid`;
      const request = new NextRequest(url);
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.message).toContain('Invalid action');
    });
  });

  describe('Response Format', () => {
    it('should return consistent response structure', async () => {
      const mockChannelResponse = {
        items: [
          {
            contentDetails: {
              relatedPlaylists: {
                uploads: 'UU8xzsABKxgXbJYLhxTn8GpQ',
              },
            },
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockChannelResponse,
      });

      const url = `http://localhost:3000/api/youtube/videos?action=channel`;
      const request = new NextRequest(url);
      const response = await GET(request);
      const data = await response.json();

      expect(data).toHaveProperty('data');
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(typeof data.timestamp).toBe('string');
    });

    it('should return error format on failure', async () => {
      const url = `http://localhost:3000/api/youtube/videos`;
      const request = new NextRequest(url);
      const response = await GET(request);
      const data = await response.json();

      expect(data).toHaveProperty('error');
      expect(data.error).toHaveProperty('message');
      expect(data.error).toHaveProperty('timestamp');
    });
  });
});
