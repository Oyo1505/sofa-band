# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js v5 beta with Google provider
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **i18n**: next-intl (EN/JP/FR support)
- **State**: TanStack Query
- **Validation**: Zod
- **Package Manager**: pnpm

### Directory Structure

The project follows a domain-driven architecture pattern:

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
│   ├── home-page/             # Homepage components
│   ├── layout/                # Layout components (header, footer, nav)
│   ├── music-page/            # Music player and audio features
│   ├── show-page/             # Events and live performances
│   └── ui/                    # Reusable UI components
├── lib/                       # Utilities and configurations
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

### Environment Variables Required
```env
POSTGRES_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_ID="..."
NEXT_PUBLIC_GOOGLE_SECRET="..."
```