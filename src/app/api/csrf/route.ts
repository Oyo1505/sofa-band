import { getCSRFToken, setCSRFToken } from '@/lib/csrf';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get existing token or create a new one
    let token = await getCSRFToken();
    
    if (!token) {
      token = await setCSRFToken();
    }

    return NextResponse.json({ 
      csrfToken: token 
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

// For convenience, allow POST to refresh token
export async function POST() {
  try {
    const token = await setCSRFToken();
    
    return NextResponse.json({ 
      csrfToken: token 
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Failed to create CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}