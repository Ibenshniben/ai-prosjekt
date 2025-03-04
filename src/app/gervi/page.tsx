"use client";
import SharedNavbar from "@/components/SharedNavbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GerviPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      <SharedNavbar />
      
      <main className="pt-32 pb-24 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-200">About Gervi</h1>
        
        <div className="bg-blue-900 p-8 rounded-lg border border-blue-800 mb-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64">
              <Image
                src="/gervi-logo.png"
                alt="Gervi Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>
          </div>
          
          <p className="text-lg mb-6">
            Gervi is a cutting-edge AI company focused on developing innovative solutions for businesses and individuals.
            Our mission is to make artificial intelligence accessible, practical, and beneficial for everyone.
          </p>
          
          <p className="text-lg mb-6">
            Founded in 2023, Gervi has quickly established itself as a leader in AI research and application development.
            Our team of experts combines deep technical knowledge with practical business experience to create AI solutions
            that address real-world challenges.
          </p>
          
          <p className="text-lg mb-6">
            Visit <a href="https://www.gervi.ai" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">www.gervi.ai</a> to learn more about our products and services.
          </p>
        </div>
        
        <button 
          onClick={() => router.back()} 
          className="text-blue-300 hover:underline flex items-center"
        >
          <span className="mr-2">←</span> Back to projects
        </button>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-8 flex justify-between text-sm bg-blue-950 border-t border-blue-900">
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