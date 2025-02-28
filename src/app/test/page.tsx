"use client";
import { useState, useEffect } from "react";

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/logs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">API Test Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div>
          <p>API Response:</p>
          <pre className="bg-gray-100 p-4 mt-2 rounded overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}