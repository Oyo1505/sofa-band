# Integration Tests

## Status: ⚠️ Requires Additional Setup

The integration tests for API routes require full Web API polyfills (Request, Response, Headers) which are not fully available in jsdom.

### Issue

NextRequest from Next.js 16 requires complete Web API implementation:
- Full Request constructor with getters/setters
- Complete Response implementation
- Headers implementation with all methods

Current polyfills in `jest.setup.ts` are basic and incomplete for Next.js server components.

### Solutions

1. **Recommended**: Use E2E tests to validate API functionality
   - E2E tests use real browsers with full Web APIs
   - Tests cover actual API behavior through UI interactions
   - Run with: `pnpm test:e2e`

2. **Alternative**: Use @edge-runtime/vm
   ```bash
   pnpm add -D @edge-runtime/vm
   ```
   Configure Jest to use edge runtime for API tests

3. **Future**: Extract API logic into testable functions
   - Separate route handlers from business logic
   - Test business logic independently
   - Mock Next.js request/response in route tests

### Current Tests

The `youtube.test.ts` file contains comprehensive tests for:
- Channel info retrieval
- Playlist video fetching
- Error handling
- Parameter validation
- Response format consistency

These tests are written and ready but require proper Web API polyfills to run.

### Running Integration Tests

To skip integration tests:
```bash
pnpm test:unit  # Only unit tests
```

To attempt running integration tests:
```bash
pnpm test:integration  # Will fail without polyfills
```

### Contributing

If you implement proper Web API polyfills, please update this README and `jest.setup.ts`.
