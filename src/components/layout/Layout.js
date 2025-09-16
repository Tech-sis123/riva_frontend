"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  ChevronDown,
  Menu,
  X,
  Bell,
  Wallet,
  Users,
  ShoppingCart,
  FileText,
  DollarSign,
  Home,
  CreditCard,
  Store,
  Receipt,
  User,
} from "lucide-react";
import Image from "next/image";
import CustomText from "@/components/ui/CustomText";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
    
    </div>
  );
};

export default Layout;
