"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import SharedNavbar from "@/components/SharedNavbar";

// Define the type for our log entries
interface LogEntry {
  id: string;
  message: string;
  timestamp: string;
  isEditing?: boolean;
}

export default function ProjectPage({ params }: { params: { id: string } }) {  // Remove Promise
  const router = useRouter();
  const projectId = params.id;  // Direct access, no need for 'use'
  
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch logs
  useEffect(() => {
    if (projectId === "2") {
      fetchLogs();
    }
  }, [projectId]);
  // Update the fetchLogs function
  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/logs');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);  // Add this for debugging
      setLogEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogEntries([]);
    } finally {
      setIsLoading(false);
    }
  };
  // Add new log entry
  // Remove the duplicate addLogEntry function and keep only this one
  const addLogEntry = async () => {
    if (newMessage.trim()) {
      try {
        console.log('Adding log entry:', newMessage);
        setIsLoading(true);
        
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: newMessage 
          })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        setNewMessage('');
        fetchLogs();
      } catch (error) {
        console.error('Error adding log:', error);
        alert('Failed to add log entry. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  // Add new log entry
  const addLogEntry = async () => {
    if (newMessage.trim()) {
      try {
        console.log('Adding log entry:', newMessage);
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: newMessage }),
          cache: 'no-store'
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(`Failed to add log: ${errorData.error || response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Log added successfully:', data);
        setNewMessage('');
        fetchLogs(); // Refresh logs
      } catch (error) {
        console.error('Error adding log:', error);
        alert('Failed to add log entry. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Delete log entry
  const deleteEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/logs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchLogs(); // Refresh logs
      }
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  // Start editing log entry
  const startEdit = (id: string) => {
    setLogEntries(logEntries.map(entry => 
      entry.id === id 
        ? { ...entry, isEditing: true } 
        : entry
    ));
    const entryToEdit = logEntries.find(entry => entry.id === id);
    if (entryToEdit) {
      setEditMessage(entryToEdit.message);
    }
  };

  // Save edited log entry
  const saveEdit = async (id: string) => {
    try {
      const response = await fetch(`/api/logs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editMessage }),
      });
      if (response.ok) {
        setLogEntries(logEntries.map(entry =>
          entry.id === id
            ? { ...entry, message: editMessage, isEditing: false }
            : entry
        ));
        setEditMessage('');
      }
    } catch (error) {
      console.error('Error updating log:', error);
    }
  };

  // If this is the log page (id === "2"), show the log interface
  if (projectId === "2") {
    return (
      <div className="min-h-screen bg-blue-950 text-white p-8">
        <SharedNavbar />
        
        <main className="pt-32 pb-24 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-blue-200">Logg</h1>
          
          {/* Add new log entry */}
          <div className="mb-8">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-4 bg-blue-900 text-white rounded-lg mb-2 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your log message here..."
              rows={4}
            />
            <button
              onClick={addLogEntry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Add Log Entry
            </button>
          </div>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-blue-300">Loading logs...</p>
          </div>
        ) : logEntries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-blue-300">No logs found. Add your first log entry!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-blue-900 rounded-lg border border-blue-800">
                {entry.isEditing ? (
                  <div>
                    <textarea
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="w-full p-2 bg-blue-800 text-white rounded mb-2 border border-blue-700"
                      rows={3}
                    />
                    <button
                      onClick={() => saveEdit(entry.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-400"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-blue-300 mb-2">{entry.timestamp}</p>
                    <p className="mb-4">{entry.message}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(entry.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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

  // Return the default project page for other IDs
  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      <SharedNavbar />
      
      <main className="pt-32 pb-24">
        <h1 className="text-4xl font-bold mb-8 text-blue-200">Oppnåelse {projectId}</h1>
        <div className="max-w-2xl">
          <p className="text-blue-300 mb-4">
            This is the detailed view of Oppnåelse {projectId}. Add your project-specific content here.
          </p>
          <button 
            onClick={() => router.back()} 
            className="text-blue-300 hover:underline flex items-center"
          >
            <span className="mr-2">←</span> Back to projects
          </button>
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