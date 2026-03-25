import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          {user.name}
        </h2>

        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Website:</b> {user.website}</p>

        <hr className="my-4" />

        <p><b>Company:</b> {user.company.name}</p>
        <p><b>Catch Phrase:</b> {user.company.catchPhrase}</p>

        <hr className="my-4" />

        <p><b>City:</b> {user.address.city}</p>
        <p><b>Street:</b> {user.address.street}</p>

      </div>

    </div>
  );
}