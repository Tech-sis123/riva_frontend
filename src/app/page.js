"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null; // No need to render anything since we're redirecting
}
