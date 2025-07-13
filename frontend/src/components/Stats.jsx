import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUrlStats } from '../api/api';

const Stats = () => {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUrlStats(id);
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  return (
    <div className="bg-white max-w-5xl mx-auto mt-36 shadow-md p-4 rounded-lg">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">Stats for: <code>{id}</code></h1>
          <div className="space-y-2">
            <p><strong>Original URL:</strong> {stats.url}</p>
            <p><strong>Short Code:</strong> {stats.shortCode}</p>
            <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(stats.updatedAt).toLocaleString()}</p>
            <p><strong>Access Count:</strong> {stats.accessCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;