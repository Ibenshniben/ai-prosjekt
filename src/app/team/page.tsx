"use client";
import SharedNavbar from "@/components/SharedNavbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function TeamPage() {
  const teamMembers: TeamMember[] = [
    { id: 1, name: "Ib Strømsvåg", description: "Description for Ib Strømsvåg", image: "/person-icon.png" },
    { id: 2, name: "Sienna Alexandra", description: "Description for Sienna Alexandra", image: "/person2.png" },
    { id: 3, name: "Heine", description: "Description for Heine", image: "/person-icon.png" },
    { id: 4, name: "Kristian", description: "Description for Kristian", image: "/person-icon.png" },
    { id: 5, name: "Pia", description: "Description for Pia", image: "/peron1.png" },
    { id: 6, name: "Aura AI", description: "Description for Aura AI", image: "/auraai.png" },
  ];

  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      <SharedNavbar />

      {/* Main content */}
      <main className="pt-32 pb-24">
        <h1 className="text-4xl font-bold text-center mb-16 text-blue-200">Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-blue-900 rounded-lg overflow-hidden border border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-blue-200">{member.name}</h2>
                <p className="text-blue-300">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
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