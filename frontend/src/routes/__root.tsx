import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { FaHome, FaInfoCircle, FaTasks, FaPlusCircle, FaUser } from "react-icons/fa";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Root />,
});

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="text-lg font-bold flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/bcit.png" alt="BCIT Logo" className="w-8 h-8" />
          <Link to="/" className="text-2xl font-semibold text-indigo-800 hover:text-gray-500 dark:text-white">
            Task Mate
          </Link>
        </div>

        <div className="flex items-center space-x-1 md:order-2 rtl:space-x-reverse">
          <button type="button" onClick={toggleDropdown} className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg className="w-5 h-5 rounded-full me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3900 3900">
              <path fill="#b22234" d="M0 0h7410v3900H0z" />
              <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" stroke-width="300" />
              <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            </svg>
            English (US)
          </button>

          {isDropdownOpen && (
            <div className="z-50 absolute top-11 right-50 w-30 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
              <ul className="py-2 font-medium" role="none">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div className="inline-flex items-center">
                      <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512">
                        <path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)" />
                        <path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)" />
                      </svg>
                      English (US)
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div className="inline-flex items-center">
                      <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-fr" viewBox="0 0 512 512">
                        <path fill="#0055A4" d="M0 0h170.7v512H0z" />
                        <path fill="#FFF" d="M170.7 0H341.4v512H170.7z" />
                        <path fill="#EF4135" d="M341.4 0H512v512H341.4z" />
                      </svg>
                      Français (French)
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div className="inline-flex items-center">
                      <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-kr" viewBox="0 0 512 512">
                        <path fill="#C60C30" d="M0 0h512v512H0z" />
                        <path fill="#003478" d="M128 0h256v512H128z" />
                        <path fill="#fff" d="M35.5 163.5h441V348H35.5z" />
                      </svg>
                      한국어 (Korean)
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    <div className="inline-flex items-center">
                      <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-cn" viewBox="0 0 512 512">
                        <path fill="#de2910" d="M0 0h512v512H0z" />
                        <use width="30" height="20" transform="matrix(76.8 0 0 76.8 128 128)" />
                      </svg>
                      中文 (中文繁體)
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="items-center justify-between hidden md:flex md:w-auto md:order-1">
          <ul className="flex space-x-4 md:space-x-8 p-0 mt-4 md:mt-0 md:border-0 bg-gray-50 dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <Link to="/" className="flex items-center space-x-2 rounded-md transition-all text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaHome className="text-xl" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center space-x-2 rounded-md transition-all text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaInfoCircle className="text-xl" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="flex items-center space-x-2 rounded-md transition-all text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaTasks className="text-xl" />
                <span>Tasks</span>
              </Link>
            </li>
            <li>
              <Link to="/createTask" className="flex items-center space-x-2 rounded-md transition-all text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaPlusCircle className="text-xl" />
                <span>Create</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center space-x-2 rounded-md transition-all text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaUser className="text-xl" />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
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
      <div className="p-2 gap-2 container mx-auto mt-4 px-4">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
