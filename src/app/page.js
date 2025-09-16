"use client";
import { useGetUsersQuery } from "../services/apiSlice";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  const { data: users, isLoading } = useGetUsersQuery();
  const currentUser = useSelector((state) => state.user.user);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome</h1>
      
    </div>
  );
}
