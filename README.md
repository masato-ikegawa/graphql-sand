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

## Web Conventions

- Components live under `components/` alongside a `utils/` directory.
- Each component group has its own folder in `components/` and follows a container/presentation pattern:
  - `components/<ComponentName>/index.tsx` for the container
  - `components/<ComponentName>/components.tsx` for presentational parts
- GraphQL types are generated via CLI (`npm run --workspace=web codegen`).

## Server Conventions

- The server follows a DDD style directory layout:
  - `presentation/` contains `.graphql` schema files and resolver implementations.
  - `application/` contains business logic. Complex operations should live here and be wired using the factory pattern.
  - `domain/` holds entities.
  - `infrastructure/` contains repositories or other data sources.
- GraphQL types are also generated using the CLI (`npm run --workspace=server codegen`).
- An example Relay style cursor based resolver is provided for `items` which supports infinite scrolling.

### Domain Layer Example

The `domain/` directory hosts entity classes and domain-specific logic. Place validation or rules here so that the application layer just orchestrates these models.

```ts
// apps/server/src/domain/item.entity.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(() => ID)
  id!: string;

  @Field()
  text!: string;

  static create(text: string): Item {
    if (!text.trim()) {
      throw new Error('Text cannot be empty');
    }
    return { id: Date.now().toString(), text };
  }
}
```

Application services invoke these domain objects to perform business operations.

### Infrastructure and Application Usage

Infrastructure classes depend on domain entities when persisting or retrieving
data. Application services coordinate repositories and domain logic. The
factory pattern wires these pieces together.

```ts
// apps/server/src/infrastructure/item.repository.ts
import { Item } from '../domain/item.entity';

export class ItemRepository {
  private data: Item[] = [/* in-memory data */];

  fetch(first: number, after?: string) {
    // locate items and return whether more pages exist
  }
}

// apps/server/src/application/item.service.ts
import { ItemRepository } from '../infrastructure/item.repository';

export class ItemService {
  constructor(private readonly repo: ItemRepository) {}

  getItems(first: number, after?: string) {
    const { items, hasNextPage } = this.repo.fetch(first, after);
    // map to connection style response using domain Item
    return { items, hasNextPage };
  }
}

// apps/server/src/application/item.factory.ts
import { ItemRepository } from '../infrastructure/item.repository';
import { ItemService } from './item.service';

export function createItemService() {
  const repo = new ItemRepository();
  return new ItemService(repo);
}
```

Resolvers call the factory to obtain a service instance and return GraphQL types
constructed from domain objects. This keeps framework code thin while your
business rules live in the domain layer.

### Dependency Flow

The compile-time dependencies flow as follows:

- Presentation code (resolvers) depends on the application layer.
- The application layer orchestrates domain logic and calls repositories.
- Infrastructure implementations of repositories depend on the domain.
- The domain layer itself has no outgoing dependencies.

In this simple example the application service directly imports the concrete
`ItemRepository` from `infrastructure`. For stricter layering you could define a
repository interface inside the domain (or application) layer and have the
infrastructure provide the implementation.
