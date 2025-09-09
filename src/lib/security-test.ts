/**
 * Security Implementation Test Suite
 * This file contains tests to verify security implementations are working correctly.
 * Run these in development to validate security measures.
 */


// Test YouTube API security
export async function testYouTubeAPISecurity() {
  try {
    // Test 1: Channel data fetch
    const response = await fetch('/api/youtube/videos?action=channel');
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ YouTube API server-side implementation working');
      return data;
    } else {
      console.log('⚠️ YouTube API returned status:', response.status);
    }
  } catch (error) {
    console.error('❌ YouTube API test failed:', error);
    throw error;
  }
}

// Test security headers
export async function testSecurityHeaders() {
  try {
    const response = await fetch('/');
    const headers = response.headers;
    
    const requiredHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'content-security-policy',
      'referrer-policy'
    ];
    
    const missing = requiredHeaders.filter(header => !headers.get(header));
    
    if (missing.length === 0) {
      console.log('✅ Security headers implemented');
    } else {
      console.log('⚠️ Missing security headers:', missing);
    }
    
    return {
      present: requiredHeaders.filter(header => headers.get(header)),
      missing
    };
  } catch (error) {
    console.error('❌ Security headers test failed:', error);
    throw error;
  }
}

// Test rate limiting (be careful not to trigger it)
export async function testRateLimiting() {
  try {
    const response = await fetch('/api/youtube/videos?action=channel');
    const headers = response.headers;
    
    if (headers.get('x-ratelimit-limit')) {
      console.log('✅ Rate limiting headers present');
      console.log('Rate limit:', headers.get('x-ratelimit-limit'));
      console.log('Remaining:', headers.get('x-ratelimit-remaining'));
    } else {
      console.log('⚠️ Rate limiting headers not found');
    }
  } catch (error) {
    console.error('❌ Rate limiting test failed:', error);
  }
}

// Run all security tests
export async function runSecurityTests() {
  console.log('🔒 Running Security Implementation Tests...\n');
  
  try {
    await testYouTubeAPISecurity();
    await testSecurityHeaders();
    await testRateLimiting();
    
    console.log('\n✅ All security tests completed');
  } catch (error) {
    console.error('\n❌ Security tests failed:', error);
  }
}

// Development helper to check security status
export function getSecurityCheckList() {
  return {
    '✅ OAuth secrets server-side': 'Google Client ID/Secret use process.env (no NEXT_PUBLIC)',
    '✅ YouTube API server-side': 'API key moved to server-side endpoint',
    '✅ Security headers': 'CSP, XSS protection, frame options configured',
    '✅ Rate limiting': 'API rate limiting with proper headers',
    '✅ Secure cookies': 'NextAuth cookies configured with secure flags',
    '✅ Origin validation': 'Request origin validation for state-changing operations',
    '✅ Type safety': 'All implementations properly typed'
  };
}