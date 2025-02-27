"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use, useState, useEffect } from "react";

// Define the type for our log entries
interface LogEntry {
  id: string;
  message: string;
  timestamp: string;
  isEditing?: boolean;
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  
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

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setLogEntries(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new log entry
  const addLogEntry = async () => {
    if (newMessage.trim()) {
      try {
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: newMessage }),
        });
        if (response.ok) {
          setNewMessage('');
          fetchLogs(); // Refresh logs
        }
      } catch (error) {
        console.error('Error adding log:', error);
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
      <div className="min-h-screen bg-[#111111] text-white p-8">
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-8">
          <Link href="/" className="text-2xl font-bold hover:underline">
            AURA AI
          </Link>
        </header>

        <main className="pt-32 pb-24 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Logg</h1>
          
          {/* Add new log entry */}
          <div className="mb-8">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-4 bg-gray-900 text-white rounded-lg mb-2"
              placeholder="Write your log message here..."
              rows={4}
            />
            <button
              onClick={addLogEntry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Log Entry
            </button>
          </div>

          {/* Log entries list */}
          <div className="space-y-4">
            {logEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-gray-900 rounded-lg">
                {entry.isEditing ? (
                  <div>
                    <textarea
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="w-full p-2 bg-gray-800 text-white rounded mb-2"
                      rows={3}
                    />
                    <button
                      onClick={() => saveEdit(entry.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded mr-2 hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">{entry.timestamp}</p>
                    <p className="mb-4">{entry.message}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(entry.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 w-full p-8 flex justify-between text-sm">
          <div>
            <p>AI PROSJEKT 2025</p>
          </div>
          <div>
            <a 
              href="https://www.gervi.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline"
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
    <div className="min-h-screen bg-[#111111] text-white p-8">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-8">
        <Link href="/" className="text-2xl font-bold hover:underline">
          AURA AI
        </Link>
      </header>

      {/* Main content */}
      <main className="pt-32 pb-24">
        <h1 className="text-4xl font-bold mb-8">Oppnåelse {projectId}</h1>
        <div className="max-w-2xl">
          <p className="text-gray-400 mb-4">
            This is the detailed view of Oppnåelse {projectId}. Add your project-specific content here.
          </p>
          <button 
            onClick={() => router.back()} 
            className="text-white hover:underline"
          >
            ← Back to projects
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-8 flex justify-between text-sm">
        <div>
          <p>AI PROSJEKT 2025</p>
        </div>
        <div>
          <a 
            href="https://www.gervi.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline"
          >
            GERVI
          </a>
        </div>
      </footer>
    </div>
  );
} 