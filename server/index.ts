import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());

const t = initTRPC.create();

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "hello world";
  }),
});

export type AppRouter = typeof appRouter;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000);
