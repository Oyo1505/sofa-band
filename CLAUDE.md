# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

### Plan & Review

### Before starting work

- Write a plan to .claude/tasks/TASK_NAME.md.

- The plan should be a detailed implementation plan and the reasoning behind them, as well as tasks broken down.

- Don’t over plan it, always think MVP.

- Once you write the plan, firstly ask me to review it. Do not continue until I approve the plan.

### While implementing

- Have to respect Clean code pratice.

- All Test have to passed green

- You should update the plan as you work.

- After you complete tasks in the plan, you should update and append detailed descriptions of the changes you made, so following tasks can be easily hand over to other engineers.

- Files rapport have to be in the folder .claudedocs

## Commands

### Development

```bash
pnpm dev          # Run development server with Prisma generation
pnpm build        # Build for production with DB push
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Database

```bash
pnpm prisma generate    # Generate Prisma client
pnpm prisma db push     # Push schema to database
```

## Architecture Overview

This is a Next.js music band website for "Sofa Rockers" with domain-driven architecture:

### Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma 7 ORM
- **Auth**: Better-Auth
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **i18n**: next-intl (EN/JP/FR support)
- **State**: TanStack Query
- **Validation**: Zod
- **Package Manager**: pnpm

### Directory Structure

The project follows a domain-driven architecture pattern with **SOLID principles** and **Dependency Injection**:

```
src/
├── app/                           # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── (main)/              # Main site pages
│   │   └── dashboard/           # Admin dashboard
│   └── api/                     # API routes (NextAuth)
├── domains/                     # Domain-specific modules
│   ├── auth/                   # Authentication logic
│   ├── dashboard/              # Admin dashboard features
│   │   ├── interfaces/         # Service contracts (IEventService, IEventRepository, IEventValidator)
│   │   ├── services/           # Business logic with DI
│   │   ├── validators/         # Validation logic
│   │   └── components/         # UI components
│   ├── home-page/             # Homepage components
│   ├── layout/                # Layout components (header, footer, nav)
│   ├── music-page/            # Music player and audio features
│   ├── show-page/             # Events and live performances
│   └── ui/                    # Reusable UI components
├── lib/                       # Utilities and configurations
│   ├── data/                  # Data access layer
│   │   └── repositories/      # Repository implementations (Prisma)
│   ├── di/                    # Dependency Injection container
│   ├── interfaces/            # Shared interfaces (ILogger)
│   └── logging/               # Logger implementations
├── models/                    # TypeScript types and interfaces
├── messages/                  # i18n translation files
└── shared/                    # Shared utilities and constants
```

### Key Features

- **Internationalized routing** with locale-based paths
- **Admin dashboard** protected by NextAuth with authorized email system
- **Music player** with React Player for audio playback
- **Event management** with CRUD operations for concerts/shows
- **Live performance videos** with embedded player
- **Responsive design** with mobile-first approach

### Database Schema

Main entities:

- `User`: Authentication and content authoring
- `Event`: Upcoming concerts/shows with location, time, info links
- `Live`: Past performances with video recordings
- `AuthorizedEmail`: Email whitelist for admin access
- NextAuth tables: `Account`, `Session`, `VerificationToken`

### Authentication Flow

- Google OAuth via NextAuth.js
- Admin access restricted to emails in `AuthorizedEmail` table
- Dashboard routes protected by middleware

### Development Notes

- Uses domain-driven folder structure instead of traditional `components/pages`
- Animations handled by Framer Motion with custom hooks
- Audio files stored in `src/public/audio/`
- All user-facing content supports multi-language
- Form validation with Zod schemas in `domains/dashboard/schema/`

### Architecture Patterns

**SOLID Principles Implementation**:

- **Dependency Injection**: Services use constructor injection for dependencies
- **Interface Segregation**: Specialized interfaces (IEventRepository, IEventService, IEventValidator, ILogger)
- **Dependency Inversion**: Dependencies on abstractions (interfaces) instead of concrete implementations
- **Single Responsibility**: Each class has one clear responsibility (service, repository, validator, logger)
- **Open/Closed**: Services are open for extension via interfaces, closed for modification

**Service Layer Pattern**:

```typescript
// Get service instance from DI container
const eventService = Container.getEventService();
const result = await eventService.create(event, user);
```

**Repository Pattern**:

- Abstracts data access through `IEventRepository` interface
- Current implementation: `PrismaEventRepository`
- Easy to swap implementations (e.g., MongoDB, in-memory for tests)

**Testing Strategy**:

- Unit tests use mocks via dependency injection
- Services are fully testable in isolation
- Example: `tests/unit/services/events.service.test.ts`

**Migration Notes**:

- All event operations now use DI container: `Container.getEventService()`
- Old static methods pattern replaced with instance methods
- Pages use container to access services instead of direct imports

### Environment Variables Required

```env
POSTGRES_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
YOUTUBE_API_KEY="..."
```

**Security Note**: OAuth secrets (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET) and API keys (YOUTUBE_API_KEY) are correctly kept server-side without NEXT_PUBLIC prefix for security.
