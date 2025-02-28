"use client";
import Link from "next/link";
import { useState } from "react";

export default function SharedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-8 z-50 bg-blue-950">
      <Link href="/" className="text-2xl font-bold text-white">AURA AI</Link>
      <nav className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:underline text-white px-4 py-2 border border-blue-700 rounded-md bg-blue-900 hover:bg-blue-800 transition-colors"
        >
          MENU
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 mt-4 py-2 w-40 bg-blue-900 border border-blue-700 shadow-lg rounded-md overflow-hidden">
            <Link 
              href="/" 
              className="block px-4 py-2 hover:bg-blue-800 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              href="/project/2" 
              className="block px-4 py-2 hover:bg-blue-800 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              LOGG
            </Link>
            <Link 
              href="/oppnaelser" 
              className="block px-4 py-2 hover:bg-blue-800 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              OPPNÅELSER
            </Link>
            <Link 
              href="/team" 
              className="block px-4 py-2 hover:bg-blue-800 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              TEAM
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}