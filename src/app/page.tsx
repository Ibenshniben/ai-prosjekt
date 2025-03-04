"use client";
import { useEffect, useRef, useState } from "react";
import SharedNavbar from "@/components/SharedNavbar";
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

  // Update the projects array in your home page
  const projects = [
    { id: 1, image: nissanGtr, title: "Team", href: "/team" },
    { id: 2, image: nissanGtr, title: "Gervi", href: "/gervi" },
    { id: 3, image: nissanGtr, title: "Video", href: "/video" },
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
    <div className="min-h-screen bg-blue-950 text-white overflow-hidden">
      <SharedNavbar />
      
      {/* Main content */}
      <main className="pt-32 pb-24">
        {/* Progress bar */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-1/3">
          <div className="w-full h-[1px] bg-blue-700">
            <div ref={progressBarRef} className="h-full bg-blue-400 w-0"></div>
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
                href={project.href || `/project/${project.id}`}
                className="flex-none w-[200px] h-[400px] mx-2 relative group"
              >
                <Image
                  src={project.image}
                  alt={`Oppnåelse ${project.id}`}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-300 rounded-lg border border-blue-800"
                  sizes="200px"
                />
                {/* Project title overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg">
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
      <footer className="fixed bottom-0 w-full p-8 flex justify-between text-sm bg-blue-950 border-t border-blue-900">
        <div>
          <p className="text-blue-300">AI PROSJEKT 2025</p>
        </div>
        <div>
          <a 
            href="https://www.gervi.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-300 hover:underline"
          >
            GERVI
          </a>
        </div>
      </footer>
    </div>
  );
}
