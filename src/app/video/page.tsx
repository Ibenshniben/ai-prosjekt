"use client";
import SharedNavbar from "@/components/SharedNavbar";
import { useRouter } from "next/navigation";

export default function VideoPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      <SharedNavbar />
      
      <main className="pt-32 pb-24 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-blue-200 text-center">Video Showcase</h1>
        
        <div className="bg-blue-900/50 p-8 rounded-xl border border-blue-700 shadow-2xl mb-8 backdrop-blur-sm">
          <div className="w-[80%] mx-auto">
            <video 
              autoPlay
              loop
              muted
              controls 
              className="w-full h-auto rounded-lg shadow-lg"
              poster="/video-thumbnail.jpg"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="mt-8 w-[80%] mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">AI Project Demonstration</h2>
            <p className="text-blue-300 text-lg leading-relaxed">
              This video showcases the capabilities and features of our advanced AI system.
              Watch as the technology demonstrates its ability to understand and respond to complex scenarios.
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => router.back()} 
          className="text-blue-300 hover:text-blue-100 flex items-center transition-colors duration-300 mx-auto bg-blue-800/30 px-6 py-3 rounded-full border border-blue-700/50 hover:bg-blue-800/50"
        >
          <span className="mr-2">←</span> Back to projects
        </button>
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