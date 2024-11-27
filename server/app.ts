import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { BcitTasksRoute } from "./routes/BcitTasks";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/BcitTasks", BcitTasksRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
