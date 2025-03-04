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
        <h1 className="text-4xl font-bold mb-8 text-blue-200">Gervi Labs</h1>
        
        <div className="bg-blue-900 p-8 rounded-lg border border-blue-800 mb-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64">
              <Image
                src="/gervi-logo.png"
                alt="Gervi Labs Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-blue-200">About Gervi Labs</h2>
          
          <p className="text-lg mb-6">
            Gervi Labs is a pioneering AI research and development company focused on creating 
            next-generation artificial intelligence solutions. Founded in 2022, our mission is to 
            develop AI technologies that enhance human capabilities and solve complex problems.
          </p>
          
          <p className="text-lg mb-6">
            Our team consists of world-class researchers, engineers, and designers who are passionate 
            about pushing the boundaries of what AI can achieve. We specialize in natural language 
            processing, computer vision, and generative AI technologies.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 text-blue-200">Our Products</h2>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              <span className="font-bold">Gervi Assistant</span> - An advanced AI assistant that helps 
              businesses automate tasks and improve productivity.
            </li>
            <li className="mb-2">
              <span className="font-bold">Gervi Vision</span> - Computer vision technology that enables 
              machines to interpret and understand visual information.
            </li>
            <li className="mb-2">
              <span className="font-bold">Gervi Create</span> - A suite of generative AI tools for 
              content creation and design.
            </li>
          </ul>
          
          <p className="text-lg">
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