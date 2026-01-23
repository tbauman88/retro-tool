# Retro Tool - Project Context for Claude

## Project Overview

Retro Tool is a real-time retrospective application for agile teams, built as an Nx monorepo. It enables teams to conduct collaborative retrospectives with drag-and-drop functionality and live updates.

## Architecture

### Monorepo Structure (Nx)

```
apps/
  ├── api/           # Express backend API server
  ├── client/        # React frontend application
  ├── client-e2e/    # Cypress end-to-end tests
  └── scripts/       # Utility scripts

libs/
  └── api-interfaces/ # Shared TypeScript interfaces between API and client
```

### Technology Stack

**Backend (apps/api):**
- Runtime: Node.js with Express
- Language: TypeScript
- Database: PostgreSQL with Prisma ORM
- Caching/Session: Redis
- Real-time: Socket.IO
- Authentication: Passport.js with GitHub OAuth2
- Security: Helmet, CORS, rate limiting (express-rate-limit + rate-limit-redis)
- Error Handling: Sentry
- Validation: express-validator

**Frontend (apps/client):**
- Framework: React 18 with TypeScript
- UI Libraries: Chakra UI, TailwindCSS, Headless UI
- State Management: React Query (TanStack Query)
- Routing: React Router v6
- Real-time: Socket.IO client
- Drag & Drop: react-beautiful-dnd
- Forms: React Hook Form
- Styling: Emotion, styled-components
- HTTP Client: Axios

**Development Tools:**
- Build System: Nx 22.3.3
- Package Manager: Yarn
- Testing: Jest, Testing Library, Cypress
- Linting: ESLint with TypeScript support
- Formatting: Prettier
- Type Checking: TypeScript 5.5

## Key Features

1. **Real-time Collaboration**: Socket.IO enables live updates across all connected clients
2. **GitHub OAuth**: Authentication via GitHub with mock auth option for development
3. **Drag & Drop Interface**: Interactive card management using react-beautiful-dnd
4. **Database Persistence**: Prisma ORM with PostgreSQL for data storage
5. **Rate Limiting**: Redis-backed rate limiting to prevent abuse
6. **Session Management**: Cookie-based sessions with express-session

## Development Setup

### Environment Variables
- Copy `.env.example` to `.env`
- Key variables:
  - `USE_MOCK_AUTH`: Set to `true` for development without GitHub OAuth
  - GitHub OAuth credentials (if using real auth)
  - Database connection strings
  - Redis connection

### Docker Compose (Recommended)
```bash
docker compose -f docker-compose.dev.yml up
```
This starts:
- PostgreSQL (port 5433)
- PostgreSQL test DB (port 5434)
- Redis (port 6379)
- API server (port 3333, debug: 9229)
- Client server (port 4200)

### Manual Development
```bash
# Start infrastructure
docker compose up db db_test redis

# Run migrations
yarn prisma migrate dev

# Start services (in separate terminals)
yarn start:api     # API on port 3333
yarn start:client  # Client on port 4200
```

## Common Development Commands

```bash
# Start specific apps
yarn start:api          # Start API server
yarn start:client       # Start client dev server

# Testing
yarn test:api          # Run API tests
yarn test:client       # Run client tests
yarn e2e               # Run E2E tests (starts API first)
yarn e2e:watch         # E2E tests in watch mode

# Database
yarn prisma:migrate    # Run database migrations
yarn prisma migrate dev # Create and run new migration

# Code quality
yarn lint              # Lint all projects
yarn format           # Format code with Prettier
yarn format:check     # Check formatting without changing

# Nx commands
yarn nx affected:test  # Test affected projects
yarn nx dep-graph     # View dependency graph
yarn nx affected:build # Build affected projects
```

## Testing Strategy

- **Unit Tests**: Jest with Testing Library for components
- **Integration Tests**: Supertest for API endpoints
- **E2E Tests**: Cypress for full application flows
- **Test Environment**: Separate test database (port 5434)

## Code Organization

### API Structure (apps/api/src/)
- Express routes with async error handling
- Prisma models and migrations in `/prisma`
- Socket.IO event handlers for real-time features
- Passport strategies for authentication
- Middleware for rate limiting, validation, error handling

### Client Structure (apps/client/src/)
- React components with TypeScript
- React Query for server state management
- Socket.IO hooks for real-time subscriptions
- React Router for navigation
- Chakra UI + TailwindCSS for styling

### Shared Interfaces (libs/api-interfaces/)
- TypeScript interfaces shared between API and client
- Ensures type safety across the full stack

## Database

- **ORM**: Prisma
- **Schema**: Located in `/prisma/schema.prisma`
- **Migrations**: Version-controlled in `/prisma/migrations/`
- **Seeding**: Configured via `prisma.seed` in package.json

## Important Notes

1. **Nx Monorepo**: All apps share dependencies defined in root `package.json`
2. **TypeScript**: Strict type checking enabled across the entire codebase
3. **Real-time**: Changes to retro boards are broadcast via Socket.IO to all connected clients
4. **Authentication**: Development mode supports mock auth; production requires GitHub OAuth
5. **Rate Limiting**: Redis-backed rate limiting protects API endpoints
6. **Sessions**: Cookie-based sessions stored in Redis for scalability

## Build & Deployment

- **Production Build**: `NODE_ENV=production yarn build`
- **Docker**: Multi-stage Dockerfile for API and separate Dockerfile for client
- **Scripts App**: Compiled to `dist/apps/scripts/main.js`, run with `yarn scripts`

## CI/CD

- GitHub Actions workflows for API and client
- Codecov integration for coverage reporting
- Separate workflows for each app ensure fast feedback

## Code Style

- ESLint configuration in `.eslintrc.json`
- Prettier configuration in `.prettierrc`
- React hooks linting enabled
- Import organization enforced

## When Working on This Project

1. **Making API Changes**: Update Prisma schema → migrate → update interfaces → update endpoints
2. **Adding Features**: Consider both real-time (Socket.IO) and REST API needs
3. **Testing**: Write tests alongside features; maintain coverage
4. **Type Safety**: Keep `libs/api-interfaces` in sync between client and server
5. **Database Changes**: Always create migrations, never modify existing ones
