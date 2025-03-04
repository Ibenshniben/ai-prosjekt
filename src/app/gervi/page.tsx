"use client";
import SharedNavbar from "@/components/SharedNavbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GerviPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-blue-950 text-white p-8 bg-gradient-to-b from-blue-950 to-blue-900">
      <SharedNavbar />
      
      <main className="pt-32 pb-24 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-blue-200 text-center">Gervi Labs</h1>
        
        <div className="bg-blue-900/40 p-10 rounded-xl border border-blue-700 shadow-2xl mb-12 backdrop-blur-sm">
          <div className="flex justify-center mb-12">
            <div className="relative w-72 h-72">
              <Image
                src="/gervi-logo.png"
                alt="Gervi Labs Logo"
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-200">About Gervi Labs</h2>
              
              <p className="text-lg mb-4 leading-relaxed text-blue-100">
                Gervi Labs is a cutting-edge artificial intelligence research company founded in 2022. 
                The company specializes in developing advanced AI solutions for various industries, 
                with a particular focus on natural language processing and computer vision technologies.
              </p>
              
              <p className="text-lg mb-4 leading-relaxed text-blue-100">
                Based in Oslo, Norway, Gervi Labs has quickly established itself as a leader in the AI 
                space through its innovative approaches and commitment to ethical AI development. The 
                company's team consists of researchers, engineers, and designers from diverse backgrounds.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-200">Products and Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-700">
                  <h3 className="text-xl font-bold mb-2 text-blue-200">Gervi Assistant</h3>
                  <p className="text-blue-100">
                    An AI-powered virtual assistant that helps businesses automate customer service 
                    and internal operations through natural language understanding.
                  </p>
                </div>
                
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-700">
                  <h3 className="text-xl font-bold mb-2 text-blue-200">Gervi Vision</h3>
                  <p className="text-blue-100">
                    Computer vision platform that enables machines to accurately interpret and 
                    analyze visual data for applications in security, retail, and healthcare.
                  </p>
                </div>
                
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-700">
                  <h3 className="text-xl font-bold mb-2 text-blue-200">Gervi Analytics</h3>
                  <p className="text-blue-100">
                    Data analytics solution that uses AI to extract meaningful insights from 
                    large datasets, helping organizations make data-driven decisions.
                  </p>
                </div>
                
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-700">
                  <h3 className="text-xl font-bold mb-2 text-blue-200">Gervi Research</h3>
                  <p className="text-blue-100">
                    Collaborative research initiatives with academic institutions to advance 
                    the field of artificial intelligence and machine learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-lg text-blue-200">
              For more information, visit <a href="https://www.gervi.ai" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-100 transition-colors">www.gervi.ai</a>
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