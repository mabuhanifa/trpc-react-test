import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { z } from "zod";

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query((opts) => {
      const { input } = opts;
      return `Hello ${input.name}` as const;
    }),
});

export type AppRouter = typeof appRouter;

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
