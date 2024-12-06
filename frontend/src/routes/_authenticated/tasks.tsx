import { api, deleteTask, getAllTasksQueryOptions } from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Skeleton } from "../../components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";

type Task = {
  status: boolean | null;
  id: number;
  courseName: string;
  description: string;
  dueDate: string;
  userId: string;
};

export const Route = createFileRoute("/_authenticated/tasks")({
  component: Tasks,
});

async function getAllTasks() {
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

  const queryClient = useQueryClient();

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Task;
    direction: "asc" | "desc";
  }>({
    key: "id",
    direction: "asc",
  });

  const handleSort = (column: keyof Task) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = () => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  if (isError) return <div>An error has occurred: {error.message}</div>;

  function TaskDeleteButton({ id }: { id: number }) {
    const mutation = useMutation({
      mutationFn: deleteTask,
      onError: (error) => {
        console.error("Error deleting task:", error);
        toast.error(`Failed to delete task: ${id}`, { position: "top-right" });
      },
      onSuccess: () => {
        console.log(`Task ${id} deleted successfully!`);
        toast.success(`Task ${id} deleted successfully!`, { position: "top-right" });
        queryClient.invalidateQueries({
          queryKey: ["getAllTasks"],
        });
      },
    });

    return (
      <button onClick={() => mutation.mutate({ id })} className="text-red-500 hover:text-red-700" disabled={mutation.isPending}>
        {mutation.isPending ? "..." : "Delete"}
      </button>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold mb-5">All Tasks</h1>
      <Table>
        <TableCaption>A list of your tasks with their current statuses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <button onClick={() => handleSort("id")} className="flex items-center">
                ID
                {sortConfig.key === "id" && <span className={`ml-2 ${sortConfig.direction === "asc" ? "text-green-500" : "text-red-500"}`}>{sortConfig.direction === "asc" ? "🔼" : "🔽"}</span>}
              </button>
            </TableHead>
            <TableHead>
              <button onClick={() => handleSort("courseName")} className="flex items-center">
                Course Name
                {sortConfig.key === "courseName" && <span className={`ml-2 ${sortConfig.direction === "asc" ? "text-green-500" : "text-red-500"}`}>{sortConfig.direction === "asc" ? "🔼" : "🔽"}</span>}
              </button>
            </TableHead>
            <TableHead>
              <button onClick={() => handleSort("description")} className="flex items-center">
                Description
                {sortConfig.key === "description" && <span className={`ml-2 ${sortConfig.direction === "asc" ? "text-green-500" : "text-red-500"}`}>{sortConfig.direction === "asc" ? "🔼" : "🔽"}</span>}
              </button>
            </TableHead>
            <TableHead>
              <button onClick={() => handleSort("dueDate")} className="flex items-center">
                Due Date
                {sortConfig.key === "dueDate" && <span className={`ml-2 ${sortConfig.direction === "asc" ? "text-green-500" : "text-red-500"}`}>{sortConfig.direction === "asc" ? "🔼" : "🔽"}</span>}
              </button>
            </TableHead>
            <TableHead>
              <button onClick={() => handleSort("status")} className="flex items-center">
                Status
                {sortConfig.key === "status" && <span className={`ml-2 ${sortConfig.direction === "asc" ? "text-green-500" : "text-red-500"}`}>{sortConfig.direction === "asc" ? "🔼" : "🔽"}</span>}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
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
                    <TableCell>
                      <Skeleton className="h-5" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5" />
                    </TableCell>
                  </TableRow>
                ))
            : sortedData()?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.courseName}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${task.status === true ? "bg-[#1e9b6d] text-white-800" : task.status === null ? "bg-[#66c2ff] text-white-800" : "bg-[#ffbb33] text-white-800"}`}>{task.status === true ? "Completed" : task.status === null ? "In Progress" : "Pending"}</span>
                  </TableCell>
                  <TableCell>
                    <TaskDeleteButton id={task.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Tasks;
