import { hc } from "hono/client";
// import { ApiRoutes } from "@server/app.ts";
import { ApiRoutes } from "../../../server/app";
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-Current-User"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
