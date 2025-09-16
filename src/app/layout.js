"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { setCredentials } from "../slices/userSlice";
import Cookies from "js-cookie";
import "../styles/globals.css";

function PersistUser({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setCredentials(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return children;
}

export default function RootLayout({ children }) {
  function ThemeManager() {
    useEffect(() => {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      const media =
        typeof window !== "undefined"
          ? window.matchMedia("(prefers-color-scheme: dark)")
          : null;

      const apply = (mode) => {
        if (typeof document === "undefined") return;
        if (!mode) {
          document.documentElement.removeAttribute("data-theme");
        } else {
          document.documentElement.setAttribute("data-theme", mode);
        }
      };

      // If user has explicit preference, use it; otherwise follow system
      if (saved === "light" || saved === "dark") {
        apply(saved);
      } else {
        apply(media && media.matches ? "dark" : "light");
      }

      // Keep in sync with system if no explicit preference
      const handleChange = (e) => {
        const explicit = localStorage.getItem("theme");
        if (explicit !== "light" && explicit !== "dark") {
          apply(e.matches ? "dark" : "light");
        }
      };
      media && media.addEventListener("change", handleChange);
      return () => media && media.removeEventListener("change", handleChange);
    }, []);

    return null;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = saved === 'light' || saved === 'dark' ? saved : (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  // Fallback to light theme if localStorage is not available
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <ThemeManager />
        <Provider store={store}>
          <PersistUser>{children}</PersistUser>
        </Provider>
      </body>
    </html>
  );
}
