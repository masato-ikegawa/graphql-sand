# Web

This directory contains the Next.js 14 application.

## Development

Initially install dependencies with:

```bash
npm install
```

Install dependencies and start the dev server:

```bash
npm ci

npm run dev
```

### Hello Page

The `Hello` component fetches its message from the GraphQL server using Apollo
Client. The fragment is defined alongside the component in
`components/Hello/fragment.ts` and a page-level query assembling those fragments
lives in `templates/hello.ts`. The container executes that query with
`useQuery`.
