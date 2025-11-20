"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky inset-x-0 top-0 z-50 bg-white border-b border-gray-200"
    >
      {/* Main header content */}
      <div className="relative py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="relative z-10 shrink-0">
              <a href="/" className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  Keyguidesconnect
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:gap-8">
              <a
                href="#guides"
                className="inline-flex items-center rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                Guides
              </a>

              <a
                href="#tours"
                className="inline-flex items-center rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                Tours
              </a>

              <a
                href="#blog"
                className="inline-flex items-center rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                Blog
              </a>

              <a
                href="#about"
                className="inline-flex items-center rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                About
              </a>

              <a
                href="#help"
                className="inline-flex items-center rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                Help
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="relative z-10 flex items-center gap-x-3">
              <div className="hidden sm:block">
                <button className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-base font-semibold text-gray-900 transition-all duration-200 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                  Sign in
                </button>
              </div>
              <Button
                size="default"
                className="bg-[#EBC8EB] hover:bg-[#DEB8DE] text-gray-900 font-semibold"
              >
                Login
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col gap-2">
                <a
                  href="#guides"
                  className="rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Guides
                </a>
                <a
                  href="#tours"
                  className="rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Tours
                </a>
                <a
                  href="#blog"
                  className="rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Blog
                </a>
                <a
                  href="#about"
                  className="rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  About
                </a>
                <a
                  href="#help"
                  className="rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Help
                </a>
                <div className="sm:hidden pt-2 border-t border-gray-200 flex flex-col gap-2">
                  <button className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base font-semibold text-gray-900 hover:border-gray-500">
                    Sign in
                  </button>
                  <Button
                    size="default"
                    className="bg-[#EBC8EB] hover:bg-[#DEB8DE] text-gray-900 font-semibold w-full rounded-xl"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
