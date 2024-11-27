import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Skeleton } from "../components/ui/skeleton";

export const Route = createFileRoute("/tasks")({
  component: Tasks,
});

async function getAllTasks() {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.BcitTasks.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await res.json();
  return data.tasks;
}

function Tasks() {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["getAllTasks"],
    queryFn: getAllTasks,
  });

  if (isError) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold mb-5">All Tasks</h1>
      <Table>
        <TableCaption>A list of your tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Select</TableHead>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Skeleton className="h-5" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.courseName}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.date}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
