import { hc } from "hono/client";
// import { ApiRoutes } from "@server/app.ts";
import { ApiRoutes } from "../../../server/app";
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>("/");

export const api = client.api;

// Get current user details
async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  return data;
}

// Query options for fetching the current user
export const userQueryOptions = queryOptions({
  queryKey: ["get-Current-User"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

// Fetch all tasks
async function getAllTasks() {
  const res = await api.BcitTasks.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  return data.tasks;
}

// Query options for fetching all tasks
export const getAllTasksQueryOptions = queryOptions({
  queryKey: ["get-all-tasks"],
  queryFn: getAllTasks,
  staleTime: 1000 * 60 * 5,
});

// Create a task
async function createTask({ value }: { value: any }) {
  const res = await api.BcitTasks.$post({ json: value });
  if (!res.ok) {
    throw new Error("Server error");
  }

  const newTask = await res.json();
  return newTask;
}

// Query options for creating a task
export const loadingCreateTaskQueryOptions = queryOptions<{
  task?: any;
}>({
  queryKey: ["loading-create-task"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

// Delete a task
export async function deleteTask({ id }: { id: number }) {
  const res = await api.BcitTasks[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("Server error");
  }
}
