import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { FaHome, FaInfoCircle, FaTasks, FaPlusCircle } from "react-icons/fa";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => <Root />,
});

function NavBar() {
  return (
    <nav className="bg-amber-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="text-lg font-bold flex items-center space-x-2">
          <img src="/bcit.png" alt="BCIT Logo" className="w-8 h-8" />
          <Link to="/" className="hover:text-gray-200">
            TaskMate
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="flex items-center space-x-2 hover:bg-blue-400 px-3 py-2 rounded-md transition">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-2 hover:bg-blue-400 px-3 py-2 rounded-md transition">
            <FaInfoCircle />
            <span>About</span>
          </Link>
          <Link to="/tasks" className="flex items-center space-x-2 hover:bg-blue-400 px-3 py-2 rounded-md transition">
            <FaTasks />
            <span>Tasks</span>
          </Link>
          <Link to="/createTask" className="flex items-center space-x-2 hover:bg-blue-400 px-3 py-2 rounded-md transition">
            <FaPlusCircle />
            <span>Create Task</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr className="border-t-2 border-gray-300" />
      <div className="container mx-auto mt-4 px-4">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}

export default Root;
