"use client";

import Link from "next/link";
import { Hospital, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Hospital className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>MYHospital</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/hospitals"
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Hospitals
            </Link>
            <Link
              href="/doctors"
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Doctors
            </Link>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground hover:text-primary transition-smooth"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
