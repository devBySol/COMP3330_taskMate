import { createFileRoute } from "@tanstack/react-router";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Route = createFileRoute("/")({
  component: Index,
});

async function getTasks() {
  const res = await api.BcitTasks["totalTasks"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch task stats");
  }
  const data = await res.json();
  return {
    totalCount: data.totalCount,
    pendingCount: data.pendingCount,
    inProgressCount: data.inProgressCount,
    completedCount: data.completedCount,
  };
}

function Index() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getTasks"],
    queryFn: getTasks,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error) return <div className="text-center text-red-600">An error has occurred: {error.message}</div>;

  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [data?.pendingCount, data?.inProgressCount, data?.completedCount],
        backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
        hoverBackgroundColor: ["#fca5a5", "#93c5fd", "#6ee7b7"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">BCIT TASK</CardTitle>
          <CardDescription className="text-center text-gray-500">Task Overview</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg font-semibold">Total Tasks: {data?.totalCount}</p>
        </CardContent>
      </Card>
      <div className="w-[300px]">
        <Doughnut data={chartData} />
      </div>
      <div className="flex justify-around w-full max-w-md">
        <div className="text-center">
          <p className="text-lg font-bold text-red-500">Pending</p>
          <p className="text-xl font-semibold">{data?.pendingCount}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-blue-500">In Progress</p>
          <p className="text-xl font-semibold">{data?.inProgressCount}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-500">Completed</p>
          <p className="text-xl font-semibold">{data?.completedCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Index;
