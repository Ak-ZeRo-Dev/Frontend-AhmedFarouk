"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/features/admin/adminSlice";

const AdminSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchTerm));
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex-0.5">
      <input
        type="text"
        placeholder="Search by ID, name, email, or role"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default AdminSearch;
