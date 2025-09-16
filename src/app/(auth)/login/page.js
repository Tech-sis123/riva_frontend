"use client";
import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomText from "@/components/ui/CustomText";
import Button from "@/components/ui/Button";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));  
  };

  const handleSubmit = () => {
    console.log("Login data:", formData);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Image (hidden on mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center relative"
        style={{
          backgroundImage: "url(/images/Onboarding.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="max-w-md text-center text-white relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <CustomText
              as="h2"
              weight="bold"
              size="3xl"
              className="mb-4 text-white"
            >
              Welcome to Riva
            </CustomText>
            <CustomText as="p" size="lg" className="opacity-90 text-white">
              Join thousands of creators building their success with our platform
            </CustomText>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Riva"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                <CustomText
                  as="span"
                  weight="semibold"
                  size="xl"
                  color="foreground"
                >
                  Riva
                </CustomText>
              </div>
            </div>
            <CustomText
              as="h1"
              weight="bold"
              size="2xl"
              color="foreground"
              className="mb-2"
            >
              Login
            </CustomText>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email */} 
            <div>
              <CustomText
                as="label"
                weight="medium"
                size="sm"
                color="muted"
                className="block mb-2"
              >
                Email Address: <span className="text-red-500">*</span>
              </CustomText>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <CustomText
                as="label"
                weight="medium"
                size="sm"
                color="muted"
                className="block mb-2"
              >
                Password: <span className="text-red-500">*</span>
              </CustomText>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end -mt-3">
              <Link
                href="/reset-password"
                className="text-sm text-primary hover:opacity-90"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button text="Login" onClick={handleSubmit} />

            {/* Login Link */}
            <div className="text-center">
              <CustomText color="subtle">
                New here?{" "}
                <Link
                  href="/register"
                  className="font-medium hover:opacity-90 text-primary"
                >
                  Create account
                </Link>
              </CustomText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
