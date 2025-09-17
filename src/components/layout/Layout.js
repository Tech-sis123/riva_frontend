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
  Search,
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
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Enhanced Header */}
      <header className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Menu button and Logo */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden -m-2.5 p-2.5 text-muted hover:text-foreground hover:bg-muted/10 rounded-md transition-colors"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
              <div className="ml-4 lg:ml-0 flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <CustomText
                    as="span"
                    weight="bold"
                    size="sm"
                    className="text-white"
                  >
                    R
                  </CustomText>
                </div>
                <CustomText
                  as="h1"
                  weight="bold"
                  size="xl"
                  color="foreground"
                >
                  Riva
                </CustomText>
              </div>
            </div>

            {/* Center - Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center gap-x-3">
              <button className="relative p-2 text-muted hover:text-foreground hover:bg-muted/10 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-x-3 pl-3 border-l border-border">
                <div className="text-right hidden sm:block">
                  <CustomText
                    as="p"
                    weight="medium"
                    size="sm"
                    color="foreground"
                  >
                    John Doe
                  </CustomText>
                  <CustomText
                    as="p"
                    size="xs"
                    color="muted"
                  >
                    Admin
                  </CustomText>
                </div>
                <button className="flex items-center gap-x-2 p-1.5 hover:bg-muted/10 rounded-lg transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Sidebar */}
      <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-0 lg:translate-x-0 z-50 lg:z-0 transition-transform duration-300 lg:static flex grow flex-col overflow-y-auto bg-background shadow-xl lg:shadow-none border-r border-border`}
        >
          {/* Sidebar Header - Mobile Only */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border lg:hidden">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <CustomText
                  as="span"
                  weight="bold"
                  size="sm"
                  className="text-white"
                >
                  R
                </CustomText>
              </div>
              <CustomText
                as="h1"
                weight="bold"
                size="lg"
                color="foreground"
              >
                Riva
              </CustomText>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 text-muted hover:text-foreground hover:bg-muted/10 rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-1 flex-col px-6 py-6">
            <div className="space-y-8">
              {/* Main Navigation */}
              <div>
                <CustomText
                  as="h2"
                  size="xs"
                  weight="semibold"
                  color="muted"
                  className="uppercase tracking-wider mb-4"
                >
                  Main Menu
                </CustomText>
                <div className="space-y-1">
                  {[
                    { name: "Dashboard", href: "/dashboard", icon: Home },
                    { name: "Wallet", href: "/wallet", icon: Wallet },
                    { name: "Store", href: "/store", icon: Store },
                    { name: "Orders", href: "/orders", icon: ShoppingCart },
                  ].map((item) => {
                    const isItemActive = isActive(item.href);
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`${
                          isItemActive
                            ? "bg-primary/10 text-primary border-r-2 border-primary"
                            : "text-muted hover:text-foreground hover:bg-muted/10"
                        } group flex items-center gap-x-3 rounded-lg p-3 transition-all duration-200 relative`}
                      >
                        <item.icon 
                          className={`h-5 w-5 shrink-0 ${
                            isItemActive 
                              ? 'text-primary' 
                              : 'text-muted group-hover:text-foreground'
                          }`} 
                        />
                        <CustomText
                          as="span"
                          weight={isItemActive ? "semibold" : "medium"}
                          size="sm"
                        >
                          {item.name}
                        </CustomText>
                        {item.name === "Orders" && cartCount > 0 && (
                          <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Management Section */}
              <div>
                <CustomText
                  as="h2"
                  size="xs"
                  weight="semibold"
                  color="muted"
                  className="uppercase tracking-wider mb-4"
                >
                  Management
                </CustomText>
                <div className="space-y-1">
                  {[
                    { name: "Transactions", href: "/transactions", icon: Receipt },
                    { name: "Cards", href: "/cards", icon: CreditCard },
                    { name: "Invoices", href: "/invoices", icon: FileText },
                    { name: "Team", href: "/team", icon: Users },
                  ].map((item) => {
                    const isItemActive = isActive(item.href);
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`${
                          isItemActive
                            ? "bg-primary/10 text-primary border-r-2 border-primary"
                            : "text-muted hover:text-foreground hover:bg-muted/10"
                        } group flex items-center gap-x-3 rounded-lg p-3 transition-all duration-200 relative`}
                      >
                        <item.icon 
                          className={`h-5 w-5 shrink-0 ${
                            isItemActive 
                              ? 'text-primary' 
                              : 'text-muted group-hover:text-foreground'
                          }`} 
                        />
                        <CustomText
                          as="span"
                          weight={isItemActive ? "semibold" : "medium"}
                          size="sm"
                        >
                          {item.name}
                        </CustomText>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pro Upgrade Section */}
            <div className="mt-auto pt-6 border-t border-border">
              <div className="bg-primary/10 rounded-lg p-4">
                <CustomText
                  as="h3"
                  weight="semibold"
                  size="sm"
                  color="primary"
                  className="mb-1"
                >
                  Upgrade to Pro
                </CustomText>
                <CustomText
                  as="p"
                  size="xs"
                  color="muted"
                  className="mb-3"
                >
                  Get access to premium features
                </CustomText>
                <button className="w-full bg-primary text-white rounded-md py-2 px-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
