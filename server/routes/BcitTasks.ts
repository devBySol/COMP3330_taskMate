import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const taskShcema = z.object({
  id: z.number().int().positive().min(1),
  courseName: z.string().min(3).max(100),
  description: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
});

type task = z.infer<typeof taskShcema>;
// Zod validation
const createPostSchema = taskShcema.omit({ id: true });
const fakeTask = [
  { id: 1, courseName: "comp3330", description: "assignments make react", date: "2024-11-30" },
  { id: 2, courseName: "comp3514", description: "c# quiz", date: "2024-12-05" },
  { id: 3, courseName: "comp1350", description: "discussion13&14", date: "2024-11-28" },
];

export const BcitTasksRoute = new Hono()
  .get("/", (c) => {
    return c.json({ tasks: fakeTask });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const newTask = await c.req.valid("json");
    fakeTask.push({ ...newTask, id: fakeTask.length + 1 });
    c.status(201);
    return c.json({ newTask });
  })
  .get("/totalTasks", async (c) => {
    await new Promise((r) => setTimeout(r, 2000));
    const totalTasks = fakeTask.length;
    return c.json({ totalTasks });
  })
  .get("/allTasks", async (c) => {
    await new Promise((r) => setTimeout(r, 2000));
    return c.json({ tasks: fakeTask });
  })
  // id should be a number {[0-9]+}
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const task = fakeTask.find((t) => t.id === id);
    if (!task) {
      return c.notFound();
    }
    return c.json({ task });
  })

  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const taskIndex = fakeTask.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return c.notFound();
    }
    const deletedTask = fakeTask.splice(taskIndex, 1)[0];
    return c.json({ task: deletedTask });
  });
