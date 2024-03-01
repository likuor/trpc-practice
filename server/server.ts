import express from 'express';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const app = express();
const PORT = 5005;

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const todoList = [
  {
    id: '1',
    content: 'sanpo',
  },
  {
    id: '2',
    content: 'product',
  },
];

const appRouter = router({
  test: publicProcedure.query(() => {
    return 'Test TRPC';
  }),
  getTodo: publicProcedure.query(() => {
    return todoList;
  }),
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT);
