import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});
async function getTotalTasks() {
  const res = await api.BcitTasks["totalTasks"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total tasks");
  }
  const data = await res.json();
  return data;
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getTotalTasks"],
    queryFn: getTotalTasks,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred:" + error.message;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>BCIT TASK</CardTitle>
        <CardDescription>Total tasks you need to do:</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.totalTasks}</CardContent>
    </Card>
  );
}

export default Index;
