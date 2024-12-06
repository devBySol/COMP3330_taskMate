import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "../lib/api";
import { Button } from "../components/ui/button";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br">
      <p className="text-xl font-semibold text-white-700 mb-4">You need to login or register</p>

      <div className="flex flex-col gap-4">
        <Button asChild className="w-full max-w-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:scale-105">
          <a href="/api/login">Login</a>
        </Button>
        <Button asChild className="w-full max-w-sm bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-teal-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105">
          <a href="/api/register">Register</a>
        </Button>
      </div>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
