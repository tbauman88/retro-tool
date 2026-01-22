![Retros Logo](./assets/retros-logo.png)

_Logo by Tuan Truong [[github]](https://github.com/tuantruong625) [[website]](https://tuantruong.info/)_

<br/>

[![codecov](https://codecov.io/gh/ajoelp/retro-tool/branch/main/graph/badge.svg?token=XSUW0861R1)](https://codecov.io/gh/ajoelp/retro-tool)
[![API](https://github.com/ajoelp/retro-tool/actions/workflows/api.yml/badge.svg?branch=main)](https://github.com/ajoelp/retro-tool/actions/workflows/api.yml)
[![API](https://github.com/ajoelp/retro-tool/actions/workflows/client.yml/badge.svg?branch=main)](https://github.com/ajoelp/retro-tool/actions/workflows/client.yml)

## Development

### Quick Start (Docker Compose)

1. Copy the `.env.example` to `.env`
2. **(Optional) Github OAuth** - If you want to use real GitHub authentication instead of mock auth:
   1. Go to https://github.com/settings/developers and create a new OAuth app
   2. Set **Homepage URL** to `http://localhost:4200`
   3. Set **Authorization callback URL** to `http://localhost:3333/auth/github/callback`
   4. Use the Client ID and Client Secret in your `.env` file
   5. Set `USE_MOCK_AUTH=false` in your `.env` file
3. Start the entire development stack: `docker compose -f docker-compose.dev.yml up`

This will start:
- PostgreSQL database (port 5433)
- PostgreSQL test database (port 5434)
- Redis (port 6379)
- Database migrations (runs automatically)
- API server (port 3333, debug port 9229)
- Client server (port 4200)

The application will be available at http://localhost:4200

### Manual Development (Without Docker)

1. Copy the `.env.example` to `.env`
2. **Github OAuth**
   1. Go to https://github.com/settings/developers and create a new OAuth app
   2. Set **Homepage URL** to `http://localhost:4200`
   3. Set **Authorization callback URL** to `http://localhost:3333/auth/github/callback`
   4. Use the Client ID and Client Secret in your `.env` file
3. Start the database servers using docker: `docker compose up db db_test redis`
4. Run the migrations: `yarn prisma migrate dev`
5. Start the API server: `yarn start api`
6. Start the client server: `yarn start client`

