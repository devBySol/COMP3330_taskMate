import { createFileRoute, Link } from "@tanstack/react-router";
import { api, userQueryOptions } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { FaUserCircle } from "react-icons/fa";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Not logged in</div>;

  return (
    <div className=" flex justify-center items-center py-8">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-6">
        <div className="flex justify-center">
          <FaUserCircle className="text-6xl text-indigo-600" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">Profile</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <span className="font-medium text-gray-600 w-32">First Name:</span>
            <span className="text-gray-800">{data.user.given_name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600 w-32">Last Name:</span>
            <span className="text-gray-800">{data.user.family_name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600 w-32">Email:</span>
            <span className="text-gray-800">{data.user.email}</span>
          </div>
        </div>
        <div className="mt-6 space-x-4 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">Edit Profile</button>
          <a href="/logout">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300">Logout</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
