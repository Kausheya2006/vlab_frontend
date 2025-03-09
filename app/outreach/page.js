"use client";

import { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Import icons
import Map from "../components/Map";

const Outreach = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    nodalUsers: 0,
    totalWorkshops: 0,
    totalUsage: 0,
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 10;

  // Fetch all users once from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users);
      setSortedUsers(data.users);

      // Calculate stats from array
      const nodalUsers = data.users.filter((user) => user.nodal_centre).length;
      const totalWorkshops = data.users.filter((user) => user.workshop > 0).length;
      const totalUsage = data.users.reduce((sum, user) => sum + (user.usage || 0), 0);

      setStats({
        totalUsers: data.users.length,
        nodalUsers,
        totalWorkshops,
        totalUsage,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Sort users locally
  const handleSort = (field) => {
    const newOrder = sortBy === field && order === "asc" ? "desc" : "asc";
    setSortBy(field);
    setOrder(newOrder);

    const sorted = [...users].sort((a, b) => {
      if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortedUsers(sorted);
  };

  // Get sorted & paginated users
  const paginatedUsers = sortedUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Sort icon handler
  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaSort className="text-gray-400" />;
    return order === "asc" ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Database & Statistics</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-5xl mb-8">
        {loading ? (
          <p className="text-gray-500">Loading stats...</p>
        ) : (
          [
            { title: "Total Users", value: stats.totalUsers },
            { title: "Nodal Users", value: stats.nodalUsers },
            { title: "Total Workshops", value: stats.totalWorkshops },
            { title: "Total Usage", value: stats.totalUsage },
          ].map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-4 text-center">
              <h2 className="text-lg font-medium text-gray-600">{item.title}</h2>
              <p className="text-3xl font-bold text-indigo-600 mt-1">{item.value}</p>
            </div>
          ))
        )}
      </div>

      <div className="w-full max-w-5xl mx-auto my-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
  <Map/>
</div>


      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-6xl">
  {loading ? (
    <p className="text-center p-6 text-gray-500">Loading...</p>
  ) : (
    <table className="w-full border-collapse">
      {/* Table Head */}
      <thead className="bg-gray-100 text-gray-700">
        <tr className="border-b">
          {["rank", "nodal_centre", "state", "usage", "users", "workshops"].map((field) => (
            <th
              key={field}
              className="p-4 text-left font-medium cursor-pointer hover:text-blue-600 transition relative"
              onClick={() => handleSort(field)}
            >
              <div className="flex items-center justify-between">
                <span>{field.replace("_", " ").charAt(0).toUpperCase() + field.slice(1)}</span>
                <span className="ml-2 text-gray-500">{getSortIcon(field)}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">{user.rank}</td>
              <td className="p-4">{user.nodal_centre}</td>
              <td className="p-4">{user.state}</td>
              <td className="p-4">{user.usage}</td>
              <td className="p-4">{user.users}</td>
              <td className="p-4">{user.workshop}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="p-6 text-center text-gray-500">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>



      {/* Pagination Controls */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Outreach;
