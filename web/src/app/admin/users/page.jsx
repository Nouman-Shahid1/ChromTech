"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Profile from "@/components/Profile/Profile";
import { fetchUsers, deleteUser } from "../../../reducers/User/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    address: "",
    city: "",
  });

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for creating or updating a user
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Determine if it's a create or update request
    const method = editUser ? "PUT" : "POST";
    const url = editUser
      ? `http://localhost:5000/api/users/${editUser._id}`
      : "http://localhost:5000/api/users";

    console.log("Submitting Form:", formData);
    console.log("API URL:", url);
    console.log("HTTP Method:", method);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Log the response for debugging
      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (response.ok) {
        alert(
          editUser ? "User updated successfully!" : "User created successfully!"
        );
        dispatch(fetchUsers());
        setShowForm(false);
        setEditUser(null);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "user",
          address: "",
          city: "",
        });
      } else {
        console.error("Failed to submit form:", responseData.message);
        alert(`Error: ${responseData.message || "Failed to submit form"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error: ${error.message || "Failed to submit form"}`);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          dispatch(deleteUser(userId));
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
      address: user.address || "",
      city: user.city || "",
    });
    setShowForm(true);
  };

  // Conditional rendering for loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">
          Error: {error.message || "Failed to fetch users"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <Profile />
      <div className="py-8 px-6">
        <p className="text-lg">HOME / USERS</p>
      </div>

      <div className="relative bg-white rounded-xl py-8 w-full mx-auto shadow-md">
        <div className="px-6">
          <p className="text-2xl font-bold text-gray-800">Users</p>
        </div>
      </div>

      {/* User Form */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded-lg shadow-md mt-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">superadmin</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
          >
            {editUser ? "Update User" : "Create User"}
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="bg-red-500 text-white px-4 py-2 mt-4 ml-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto w-full mt-8">
        <table className="min-w-full bg-white text-center rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-gray-700 border-b">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">{user.firstName}</td>
                <td className="py-4 px-4">{user.lastName}</td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-4 px-4">{user.role}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-500 px-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-500 px-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
