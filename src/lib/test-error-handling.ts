// Test script for error handling system
// This file demonstrates the robustness of our error handling system

import { apiClient } from './api-client';
import { formatErrorMessage } from './error-utils';

// Test configuration
const TEST_TIMEOUT = 5000;
const TEST_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'skip';
  duration: number;
  error?: string;
  details?: any;
}

class ErrorHandlingTester {
  private results: TestResult[] = [];

  private async runTest(
    name: string, 
    testFn: () => Promise<void>,
    timeout: number = TEST_TIMEOUT
  ): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      await Promise.race([
        testFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Test timeout')), timeout)
        )
      ]);
      
      return {
        name,
        status: 'pass',
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        name,
        status: 'fail',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async testBasicApiClient() {
    const result = await this.runTest(
      'Basic API Client - Valid Request',
      async () => {
        const response = await apiClient.get('/api/youtube/videos?action=channel');
        
        if (!response.data && !response.error) {
          throw new Error('Expected either data or error in response');
        }
        
        if (response.status < 200 || response.status >= 600) {
          throw new Error(`Invalid status code: ${response.status}`);
        }
      }
    );
    
    this.results.push(result);
  }

  async testRetryMechanism() {
    const result = await this.runTest(
      'Retry Mechanism - Network Errors',
      async () => {
        // Test with invalid URL to trigger network error and retry
        const response = await apiClient.get('http://invalid-domain-that-does-not-exist.com/api/test', {
          retries: 2,
          retryDelay: 100
        });
        
        // Should get error response, not throw exception
        if (!response.error) {
          throw new Error('Expected error response for invalid URL');
        }
        
        if (response.status !== 0 && response.status !== 500) {
          throw new Error(`Expected status 0 or 500 for network error, got ${response.status}`);
        }
      }
    );
    
    this.results.push(result);
  }

  async testTimeoutHandling() {
    const result = await this.runTest(
      'Timeout Handling',
      async () => {
        const startTime = Date.now();
        
        const response = await apiClient.get('/api/youtube/videos?action=channel', {
          timeout: 1 // Very short timeout
        });
        
        const duration = Date.now() - startTime;
        
        // Should complete quickly due to timeout
        if (duration > 2000) {
          throw new Error(`Request took too long: ${duration}ms`);
        }
        
        // Should have error or success, not hang
        if (response.status === undefined) {
          throw new Error('Response status is undefined');
        }
      },
      3000 // Give test itself more time
    );
    
    this.results.push(result);
  }

  async testValidationErrors() {
    const result = await this.runTest(
      'Validation Error Handling',
      async () => {
        // Test invalid action parameter
        const response = await apiClient.get('/api/youtube/videos?action=invalid');
        
        if (response.status !== 400) {
          throw new Error(`Expected 400 status for validation error, got ${response.status}`);
        }
        
        if (!response.error) {
          throw new Error('Expected error message for validation error');
        }
      }
    );
    
    this.results.push(result);
  }

  async testErrorMessageFormatting() {
    const result = await this.runTest(
      'Error Message Formatting',
      async () => {
        const testError = new Error('Test error message');
        
        // Test English formatting
        const enMessage = formatErrorMessage(testError, 'en', 'Fallback');
        if (!enMessage || enMessage === 'Fallback') {
          throw new Error('English error formatting failed');
        }
        
        // Test French formatting  
        const frMessage = formatErrorMessage(testError, 'fr', 'Fallback');
        if (!frMessage || frMessage === 'Fallback') {
          throw new Error('French error formatting failed');
        }
        
        // Test Japanese formatting
        const jpMessage = formatErrorMessage(testError, 'jp', 'Fallback');
        if (!jpMessage || jpMessage === 'Fallback') {
          throw new Error('Japanese error formatting failed');
        }
      }
    );
    
    this.results.push(result);
  }

  async testRateLimiting() {
    const result = await this.runTest(
      'Rate Limiting',
      async () => {
        // Make multiple rapid requests to test rate limiting
        const requests = Array(10).fill(null).map(() =>
          apiClient.get('/api/youtube/videos?action=channel', { 
            retries: 0,  // Don't retry for this test
            timeout: 5000 
          })
        );
        
        const responses = await Promise.all(requests);
        
        // At least some requests should complete
        const successful = responses.filter(r => r.status === 200).length;
        const rateLimited = responses.filter(r => r.status === 429).length;
        
        if (successful === 0 && rateLimited === 0) {
          throw new Error('No requests completed successfully or hit rate limit');
        }
        
        console.log(`Rate limiting test: ${successful} successful, ${rateLimited} rate limited`);
      },
      15000 // Longer timeout for multiple requests
    );
    
    this.results.push(result);
  }

  async runAllTests(): Promise<TestResult[]> {
    console.log('🧪 Starting Error Handling System Tests...\n');
    
    await this.testBasicApiClient();
    await this.testValidationErrors();
    await this.testErrorMessageFormatting();
    await this.testTimeoutHandling();
    await this.testRetryMechanism();
    await this.testRateLimiting();
    
    return this.results;
  }

  printResults(): void {
    const passed = this.results.filter(r => r.status === 'pass').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const skipped = this.results.filter(r => r.status === 'skip').length;
    
    console.log('\n📊 Test Results Summary:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⏭️ Skipped: ${skipped}`);
    console.log(`📈 Total: ${this.results.length}\n`);
    
    this.results.forEach(result => {
      const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⏭️';
      const duration = `${result.duration}ms`;
      
      console.log(`${icon} ${result.name} (${duration})`);
      
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      
      if (result.details) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
      }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log(`🎯 Success Rate: ${((passed / this.results.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(50));
  }
}

// Export for use in development/testing
export async function runErrorHandlingTests(): Promise<TestResult[]> {
  const tester = new ErrorHandlingTester();
  const results = await tester.runAllTests();
  tester.printResults();
  return results;
}

// CLI usage (if running directly)
if (require.main === module) {
  runErrorHandlingTests().catch(console.error);
}