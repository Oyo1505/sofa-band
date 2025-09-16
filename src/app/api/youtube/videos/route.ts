import { NextRequest, NextResponse } from 'next/server';
import { withYouTubeErrorHandling, withTimeout } from '@/lib/api-middleware';
import { ApiResponse } from '@/lib/api-types';
import { ExternalApiError, ValidationError } from '@/lib/error-utils';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UC8xzsABKxgXbJYLhxTn8GpQ';

if (!YOUTUBE_API_KEY) {
  throw new Error('YOUTUBE_API_KEY is not configured in environment variables');
}

async function handleYouTubeRequest(request: NextRequest): Promise<ApiResponse> {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (!action) {
    throw new ValidationError('Action parameter is required');
  }

  if (action === 'channel') {
    // Get channel info and upload playlist ID with timeout
    const response = await withTimeout(
      fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      ),
      15000, // 15 second timeout for YouTube API
      'YouTube API request timed out'
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new ExternalApiError(
        `YouTube API error: ${response.status} ${response.statusText}`,
        'YouTube API',
        response.status,
        new Error(errorText)
      );
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new ExternalApiError('Channel not found', 'YouTube API', 404);
    }

    const channelData = data.items[0];

    if (!channelData.contentDetails?.relatedPlaylists?.uploads) {
      throw new ExternalApiError('Channel upload playlist not found', 'YouTube API', 404);
    }

    const playlistId = channelData.contentDetails.relatedPlaylists.uploads;

    return {
      data: {
        playlistId: playlistId
      },
      status: 200,
      timestamp: new Date().toISOString()
    };
  }

  if (action === 'playlist') {
    const playlistId = searchParams.get('playlistId');
    
    if (!playlistId) {
      throw new ValidationError('Playlist ID is required');
    }

    // Validate playlist ID format
    if (!/^[a-zA-Z0-9_-]+$/.test(playlistId)) {
      throw new ValidationError('Invalid playlist ID format');
    }

    // Get videos from playlist with timeout
    const response = await withTimeout(
      fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&maxResults=50&order=date`
      ),
      15000,
      'YouTube API request timed out'
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      
      if (response.status === 404) {
        throw new ExternalApiError('Playlist not found', 'YouTube API', 404);
      }
      
      if (response.status === 403) {
        throw new ExternalApiError('YouTube API quota exceeded or access forbidden', 'YouTube API', 403);
      }
      
      throw new ExternalApiError(
        `YouTube API error: ${response.status} ${response.statusText}`,
        'YouTube API',
        response.status,
        new Error(errorText)
      );
    }

    const data = await response.json();
    
    // Check for YouTube API errors in response
    if (data.error) {
      throw new ExternalApiError(
        `YouTube API error: ${data.error.message}`,
        'YouTube API',
        data.error.code || 400
      );
    }
    
    return {
      data: {
        videos: data?.items?.map((item: any) => ({
          ...item.snippet,
          videoId: item.snippet.resourceId?.videoId
        })) || []
      },
      status: 200,
      timestamp: new Date().toISOString()
    };
  }

  throw new ValidationError(`Invalid action parameter: ${action}`);
}

export const GET = withYouTubeErrorHandling(handleYouTubeRequest);
