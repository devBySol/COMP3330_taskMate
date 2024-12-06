import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { tasks as tasksTable } from "../db/schema/tasks";
import { eq, sql } from "drizzle-orm";
import { getUser } from "../kinde";

const taskSchema = z.object({
  courseName: z.string().min(3).max(100),
  description: z.string(),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  status: z.boolean().nullable(),
});

const createPostSchema = taskSchema;

export const BcitTasksRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.get("user");
    const tasks = await db.select().from(tasksTable).where(eq(tasksTable.userId, user.id));
    return c.json({ tasks });
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const newTask = await c.req.valid("json");
    const user = c.get("user");

    const result = await db
      .insert(tasksTable)
      .values({
        courseName: newTask.courseName,
        description: newTask.description,
        dueDate: new Date(newTask.dueDate),
        status: newTask.status ?? null,
        userId: user.id,
      })
      .returning();

    c.status(201);
    return c.json({ task: result[0] });
  })
  .get("/totalTasks", getUser, async (c) => {
    const user = c.get("user");

    const [pendingCount, inProgressCount, completedCount, totalCount] = await Promise.all([
      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(tasksTable)
        .where(sql`${tasksTable.userId} = ${user.id} AND ${tasksTable.status} = false`),

      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(tasksTable)
        .where(sql`${tasksTable.userId} = ${user.id} AND ${tasksTable.status} IS NULL`),

      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(tasksTable)
        .where(sql`${tasksTable.userId} = ${user.id} AND ${tasksTable.status} = true`),

      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(tasksTable)
        .where(sql`${tasksTable.userId} = ${user.id}`),
    ]);

    return c.json({
      totalCount: totalCount[0]?.count || 0,
      pendingCount: pendingCount[0]?.count || 0,
      inProgressCount: inProgressCount[0]?.count || 0,
      completedCount: completedCount[0]?.count || 0,
    });
  })

  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.get("user");

    const deletedTask = await db.delete(tasksTable).where(eq(tasksTable.id, id)).returning();

    if (!deletedTask.length) {
      return c.notFound();
    }

    return c.json({ task: deletedTask[0] });
  });
