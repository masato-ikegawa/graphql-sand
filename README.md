# GraphQL Sand Monorepo

This repository contains a basic monorepo with two applications:

- **web**: a Next.js 14 application using the Pages Router
- **server**: a NestJS application exposing a simple GraphQL API

## Structure

```
apps/
  web/    # Next.js 14 app (Pages Router)
  server/ # NestJS GraphQL API
```

## Running the projects

Dependency installation and execution requires Node.js and npm.

```
# Install dependencies for all workspaces
npm install

# Start the Next.js app
npm run --workspace=web dev

# Start the NestJS server in development mode
npm run --workspace=server start:dev
```

Each app listens on a different port so you can run them together.
