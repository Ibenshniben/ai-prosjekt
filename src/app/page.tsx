"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import nissanGtr from "../../public/image.png";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Register the Draggable plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const projects = [
    { id: 1, image: nissanGtr, title: "Oppnåelse 1" },
    { id: 2, image: nissanGtr, title: "Logg" },
    { id: 3, image: nissanGtr, title: "Oppnåelse 3" },
    { id: 4, image: nissanGtr, title: "Oppnåelse 4" },
    { id: 5, image: nissanGtr, title: "Oppnåelse 5" },
    { id: 6, image: nissanGtr, title: "Oppnåelse 6" },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !progressBar) return;

    // Initialize draggable
    Draggable.create(container, {
      type: "x",
      inertia: true,
      bounds: {
        minX: -(container.scrollWidth - container.clientWidth),
        maxX: 0
      },
      onDrag: function() {
        const progress = (Math.abs(this.x) / (container.scrollWidth - container.clientWidth)) * 100;
        gsap.to(progressBar, {
          width: `${progress}%`,
          duration: 0.1
        });
      }
    });

    // Handle wheel scroll anywhere on the document
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!container) return;

      const scrollAmount = e.deltaY;
      const currentX = gsap.getProperty(container, "x") as number;
      const newX = currentX - scrollAmount;
      const maxScroll = -(container.scrollWidth - container.clientWidth);

      // Ensure we don't scroll beyond bounds
      const boundedX = Math.max(maxScroll, Math.min(0, newX));

      gsap.to(container, {
        x: boundedX,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: function() {
          const progress = (Math.abs(gsap.getProperty(container, "x") as number) / 
            (container.scrollWidth - container.clientWidth)) * 100;
          gsap.to(progressBar, {
            width: `${progress}%`,
            duration: 0.1
          });
        }
      });
    };

    // Add wheel event listener to document instead of just main
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full flex justify-between items-center p-8 z-50">
        <div className="text-2xl font-bold">AURA AI</div>
        <nav className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:underline"
          >
            MENU
          </button>
          
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-4 py-2 w-40 bg-[#111111] border border-gray-800 shadow-lg">
              <Link 
                href="/logg" 
                className="block px-4 py-2 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGG
              </Link>
              <Link 
                href="/oppnaelser" 
                className="block px-4 py-2 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                OPPNÅELSER
              </Link>
              <Link 
                href="/team" 
                className="block px-4 py-2 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                TEAM
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-32 pb-24">
        {/* Progress bar */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-1/3">
          <div className="w-full h-[1px] bg-gray-700">
            <div ref={progressBarRef} className="h-full bg-white w-0"></div>
          </div>
        </div>

        {/* Centered container for images */}
        <div className="flex justify-center">
          {/* Image strips container */}
          <div 
            ref={scrollContainerRef}
            className="flex flex-nowrap cursor-grab active:cursor-grabbing"
          >
            {projects.map((project) => (
              <Link 
                key={project.id}
                href={`/project/${project.id}`}
                className="flex-none w-[200px] h-[400px] mx-2 relative group"
              >
                <Image
                  src={project.image}
                  alt={`Oppnåelse ${project.id}`}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
                  sizes="200px"
                />
                {/* Project title overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                  <h2 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-8 flex justify-between text-sm">
        <div>
          <p>AI PROSJEKT 2025</p>
        </div>
        <div>
          <a 
            href="https://www.gervi.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline"
          >
            GERVI
          </a>
        </div>
      </footer>
    </div>
  );
}
