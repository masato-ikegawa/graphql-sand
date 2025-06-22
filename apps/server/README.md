# Server

This directory contains the NestJS GraphQL server.

## Development

Install dependencies and run the server in watch mode:

```bash
npm ci
npm run start:dev
```

## Data flow

The request/response flow from the GraphQL resolver down to the infrastructure layer is as follows:

```
[ItemsResolver]        -> handles GraphQL queries
      |
      v
[ItemService]          -> application logic
      |
      v
[ItemRepository]       -> infrastructure access
      |
      v
[in-memory data store] -> returns Item entities
```

The service converts repository results into the `ItemConnection` type used by the GraphQL API.
