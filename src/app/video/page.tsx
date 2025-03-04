"use client";
import SharedNavbar from "@/components/SharedNavbar";
import { useRouter } from "next/navigation";

export default function VideoPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      <SharedNavbar />
      
      <main className="pt-32 pb-24 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-200">Video</h1>
        
        <div className="bg-blue-900 p-6 rounded-lg border border-blue-800 mb-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[500px] rounded-md"
            ></iframe>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Video Title</h2>
            <p className="text-blue-300">
              This is a description of the video. You can provide context, explain what the video is about,
              or add any other relevant information here.
            </p>
          </div>
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