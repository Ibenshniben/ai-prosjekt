"use client";
import SharedNavbar from "@/components/SharedNavbar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PdfPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading the PDF
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      <SharedNavbar />
      
      <main className="pt-32 pb-24 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-blue-200 text-center">Document Viewer</h1>
        
        <div className="bg-blue-900/50 p-8 rounded-xl border border-blue-700 shadow-2xl mb-12 backdrop-blur-sm">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[600px]">
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-300">Loading document...</p>
            </div>
          ) : (
            <div className="w-full h-[600px] bg-white rounded-lg overflow-hidden">
              <iframe 
                src="/document.pdf" 
                className="w-full h-full"
                title="PDF Document"
              />
            </div>
          )}
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">Project Documentation</h2>
            <p className="text-blue-300 text-lg leading-relaxed">
              This document contains detailed information about the project, including specifications, 
              requirements, and implementation details. Please review the document carefully for a 
              comprehensive understanding of the project.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6">
          <button 
            onClick={() => router.back()} 
            className="text-blue-300 hover:text-blue-100 flex items-center transition-colors duration-300 bg-blue-800/30 px-6 py-3 rounded-full border border-blue-700/50 hover:bg-blue-800/50"
          >
            <span className="mr-2">←</span> Back to projects
          </button>
          
          <a 
            href="/document.pdf" 
            download
            className="text-blue-300 hover:text-blue-100 flex items-center transition-colors duration-300 bg-blue-800/30 px-6 py-3 rounded-full border border-blue-700/50 hover:bg-blue-800/50"
          >
            <span className="mr-2">↓</span> Download PDF
          </a>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-8 flex justify-between text-sm bg-blue-950/80 backdrop-blur-sm border-t border-blue-900">
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