import { createFileRoute, Link } from "@tanstack/react-router";
import { api, userQueryOptions } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Not logged in</div>;
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-300  rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-6xl text-indigo-800" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Profile</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold text-indigo-800 w-32">First Name:</span>
            <span className="text-gray-800">{data.user.given_name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-indigo-800 w-32">Last Name:</span>
            <span className="text-gray-800">{data.user.family_name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-indigo-800 w-32">Email:</span>
            <span className="text-gray-800">{data.user.email}</span>
          </div>
        </div>

        <div className="flex space-x-4 justify-center mt-6">
          <Button className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-md hover:from-indigo-700 hover:to-blue-700 transition duration-300">Edit Profile</Button>
          <a href="/api/logout">
            <Button className="w-full max-w-xs bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-lg font-semibold text-md hover:from-red-700 hover:to-red-900 transition duration-300">Logout</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
