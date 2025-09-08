import { NextRequest, NextResponse } from 'next/server';
import { withCSRFProtection, CSRFError } from '@/lib/csrf';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UC8xzsABKxgXbJYLhxTn8GpQ';

if (!YOUTUBE_API_KEY) {
  throw new Error('YOUTUBE_API_KEY is not configured in environment variables');
}

async function handleYouTubeRequest(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

    if (action === 'channel') {
      // Get channel info and upload playlist ID
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch YouTube channel data');
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
      }

      return NextResponse.json({
        playlistId: data.items[0].contentDetails.relatedPlaylists.uploads
      });
    }

    if (action === 'playlist') {
      const playlistId = searchParams.get('playlistId');
      
      if (!playlistId) {
        return NextResponse.json({ error: 'Playlist ID is required' }, { status: 400 });
      }

      // Get videos from playlist
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&maxResults=50&order=date`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch YouTube playlist data');
      }

      const data = await response.json();
      
      return NextResponse.json({
        videos: data?.items?.map((item: any) => item.snippet) || []
      });
    }

    return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  try {
    return await withCSRFProtection(request, handleYouTubeRequest);
  } catch (error) {
    if (error instanceof CSRFError) {
      return NextResponse.json(
        { error: 'CSRF validation failed' },
        { status: 403 }
      );
    }
    
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500 }
    );
  }
}

// Add rate limiting and caching headers
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add cache headers for YouTube data (cache for 10 minutes)
  response.headers.set('Cache-Control', 'public, max-age=600, stale-while-revalidate=300');
  
  return response;
}