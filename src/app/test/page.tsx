"use client";
import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 bg-blue-950 text-white min-h-screen">
      <h1 className="text-2xl mb-4">Simple Test Page</h1>
      <p>Current count: {count}</p>
      <button 
        className="mt-4 px-4 py-2 bg-blue-600 rounded"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}