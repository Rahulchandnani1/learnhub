import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaSearch,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import "../styles/User.css";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
const [open, setOpen] = useState(false);

const [editUser, setEditUser] = useState(null);

const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [role, setRole] = useState("student");
  const limit = 5;

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/user?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {

    setEditUser(user);

    setName(user.name);

    setEmail(user.email);

    setRole(user.role);

    setOpen(true);

};
const handleUpdate = async () => {

    try {

        await api.put(

            `/user/${editUser.id}`,

            {

                name,

                email,

                role

            }

        );

        setOpen(false);

        fetchUsers();

    } catch (error) {

        console.log(error);

    }

};

  return (
    <div style={{ padding: "30px" }}>
      <div className="page-header">

    <div>

        <h1>User Management</h1>

        <p>
            Manage all registered users
        </p>

    </div>

</div>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

             <td>

<span
className={`role-badge ${user.role}`}
>

{user.role}

</span>

</td>

              <td>
               <button
className="icon-btn edit-btn"
onClick={()=>
handleEdit(user)}
>

<FaEdit/>

</button>

               <button
className="icon-btn delete-btn"
onClick={()=>
handleDelete(user.id)}
>

<FaTrash/>

</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span
          style={{
            margin: "0 20px",
          }}
        >
          Page {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {
open && (

<div className="modal-overlay">

<div className="modal">

<h2>Edit User</h2>

<label>Name</label>

<input
value={name}
onChange={(e)=>
setName(e.target.value)}
/>

<label>Email</label>

<input
value={email}
onChange={(e)=>
setEmail(e.target.value)}
/>

<label>Role</label>

<select
value={role}
onChange={(e)=>
setRole(e.target.value)}
>

<option value="student">
Student
</option>

<option value="Admin">
Admin
</option>

</select>

<div className="modal-actions">

<button
className="secondary-btn"
onClick={()=>
setOpen(false)}
>

Cancel

</button>

<button
className="primary-btn"
onClick={handleUpdate}
>

Save Changes

</button>

</div>

</div>

</div>

)
}
    </div>
  );
};

export default Users;