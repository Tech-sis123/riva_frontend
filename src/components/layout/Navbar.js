"use client";
import { useDispatch } from "react-redux";
import { clearUser } from "../../slices/userSlice";
import Cookies from "js-cookie";

export default function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-background shadow-sm border-b border-border sticky top-0 z-50"></header>
  );
}
