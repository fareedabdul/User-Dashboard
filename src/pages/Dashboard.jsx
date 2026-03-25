import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [order, setOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // 🔍 SEARCH
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔄 SORT (Name + Company)
  const sorted = [...filtered].sort((a, b) => {
    let valA =
      sortField === "company" ? a.company.name : a.name;
    let valB =
      sortField === "company" ? b.company.name : b.name;

    return order === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        User Directory Dashboard
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort Controls */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSortField("name")}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Sort Name
          </button>

          <button
            onClick={() => setSortField("company")}
            className="bg-green-500 text-white px-3 py-2 rounded"
          >
            Sort Company
          </button>

          <button
            onClick={() =>
              setOrder(order === "asc" ? "desc" : "asc")
            }
            className="bg-gray-700 text-white px-3 py-2 rounded"
          >
            {order === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(user => (
              <tr
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-3">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {sorted.map(user => (
          <div
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="bg-white p-4 rounded-xl shadow cursor-pointer"
          >
            <h2 className="font-bold">{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p className="text-sm text-gray-500">
              {user.company.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}