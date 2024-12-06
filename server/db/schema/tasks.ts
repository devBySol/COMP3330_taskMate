import { pgTable, serial, varchar, timestamp, boolean, index } from "drizzle-orm/pg-core";

export const tasks = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    courseName: varchar("course_name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1024 }).notNull(),
    status: boolean("status").default(false),
    dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
    userId: varchar("user_id").notNull(),
  },
  (tasks) => {
    return {
      userIdIndex: index("user_id_idx").on(tasks.userId),
    };
  }
);
