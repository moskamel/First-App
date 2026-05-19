"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppStoreBtn, GooglePlayBtn } from "@/components/ui/AppStoreButtons";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "المميزات", href: "/features" },
  { label: "الوظائف", href: "/careers" },
  { label: "المدوّنة", href: "/blog" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? "10px 32px" : "16px 32px",
        background: scrolled ? "rgba(251,246,241,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(67,36,103,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <div
            className="h-10 flex items-center font-black text-2xl tracking-tight"
            style={{ color: "#1B0E2B" }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #F58762, #C95FA0, #432467)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ريفيوز
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[15px] font-semibold transition-opacity hover:opacity-100"
              style={{ color: "#1B0E2B", opacity: 0.75 }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          <AppStoreBtn size="sm" theme="dark" />
          <GooglePlayBtn size="sm" theme="light" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="القائمة"
        >
          <span
            className="block w-6 h-0.5 rounded transition-all duration-300"
            style={{
              background: "#1B0E2B",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 rounded transition-all duration-300"
            style={{
              background: "#1B0E2B",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 rounded transition-all duration-300"
            style={{
              background: "#1B0E2B",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden absolute top-full inset-x-0 p-6 flex flex-col gap-4"
          style={{
            background: "rgba(251,246,241,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(67,36,103,0.08)",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-lg font-semibold"
              style={{ color: "#1B0E2B" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <AppStoreBtn size="sm" theme="dark" />
            <GooglePlayBtn size="sm" theme="light" />
          </div>
        </div>
      )}
    </nav>
  );
}
