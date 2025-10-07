import {import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [username, setUsername] = useState('');
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    setCount(null);
    try {
      const resp = await axios.get(`/api/count?username=${username}`);
      setCount(resp.data.count);
    } catch {
      setError('Failed to fetch tweets. Make sure username exists.');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-purple-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Monad Mention Tracker</h1>
        <input
          type="text"
          placeholder="Enter Twitter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
        >
          {loading ? 'Checking...' : 'Check Mentions'}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {count !== null && !error && (
          <p className="mt-4 text-xl font-medium text-purple-800">
            Monad mentioned: <span className="font-bold">{count}</span> times
          </p>
        )}
      </div>
    </div>
  );
        }
