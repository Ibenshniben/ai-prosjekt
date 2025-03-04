"use client";
import SharedNavbar from "@/components/SharedNavbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TeamPage() {
  const router = useRouter();
  
  const teamMembers = [
    {
      name: "Team Member 1",
      role: "Developer",
      image: "/placeholder.jpg"
    },
    {
      name: "Team Member 2",
      role: "Designer",
      image: "/placeholder.jpg"
    },
    {
      name: "Team Member 3",
      role: "Project Manager",
      image: "/placeholder.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      <SharedNavbar />
      
      <main className="pt-32 pb-24 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-200">Our Team</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-blue-900 p-6 rounded-lg border border-blue-800">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <p className="text-blue-300">{member.role}</p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => router.back()} 
          className="mt-8 text-blue-300 hover:underline flex items-center"
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