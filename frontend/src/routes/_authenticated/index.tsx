import { createFileRoute } from "@tanstack/react-router";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { api } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Route = createFileRoute("/_authenticated/")({
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

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error) return <div className="text-center text-red-600">An error has occurred: {error.message}</div>;

  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [data?.pendingCount, data?.inProgressCount, data?.completedCount],
        backgroundColor: ["#ffbb33", "#66c2ff", "#1e9b6d"],
        hoverBackgroundColor: ["#ffaa55", "#80c8ff", "#2bc580"],
        borderWidth: 2,
      },
    ],
  };

  const completionRate = data?.totalCount ? (data.completedCount / data.totalCount) * 100 : 0;

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-lg bg-gradient-to-br from-blue-50 to-indigo-100 transition-all rounded-lg shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-indigo-800">Your Tasks Progress</CardTitle>
          <CardDescription className="text-center text-indigo-600 mt-2">Task Status Overview</CardDescription>
        </CardHeader>

        <CardContent className="text-center mt-6">
          <p className="text-lg font-semibold text-indigo-800">Total Tasks: {data?.totalCount}</p>
        </CardContent>

        <div className="flex justify-between gap-4 w-full max-w-md px-4 mb-6">
          <div className="bg-orange-50 dark:bg-gray-600 rounded-lg p-4 flex flex-col items-center justify-center w-1/3">
            <span className="text-xl font-bold text-orange-600 dark:text-orange-300">{data?.pendingCount}</span>
            <p className="text-sm text-gray-600 dark:text-gray-300">Pending</p>
          </div>
          <div className="bg-teal-50 dark:bg-gray-600 rounded-lg p-4 flex flex-col items-center justify-center w-1/3">
            <span className="text-xl font-bold text-teal-600 dark:text-teal-300">{data?.inProgressCount}</span>
            <p className="text-sm text-gray-600 dark:text-gray-300">In Progress</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-4 flex flex-col items-center justify-center w-1/3">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-300">{data?.completedCount}</span>
            <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[300px] mt-6 mb-6">
            <Doughnut data={chartData} options={{ responsive: true }} />
          </div>
        </div>

        <button onClick={toggleDetails} type="button" className="text-sm font-medium text-indigo-600 text-indigo-600 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white">
          Show More Details
          <svg className="w-2 h-2 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {showDetails && (
          <div id="more-details" className="space-y-2 mt-4">
            <dl className="flex items-center justify-between">
              <dt className="text-indigo-600 text-indigo-400 text-sm font-normal">Average Task Completion Rate:</dt>
              <dd className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                </svg>{" "}
                {completionRate.toFixed(2)}%
              </dd>
            </dl>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Index;
