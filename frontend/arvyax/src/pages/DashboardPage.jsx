import React, { useState, useEffect } from 'react';
import sessionService from '../services/sessionService'; 

const DashboardPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const response = await sessionService.getPublicSessions();
        setSessions(response.data);
      } catch (error) {
        console.error('Failed to fetch public sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSessions();
  }, []); // Empty array ensures this runs only once on mount

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div>
      <h1>Wellness Sessions</h1>
      <p>Discover our community's published sessions.</p>
      <hr />
      {sessions.length > 0 ? (
        <div>
          {sessions.map((session) => (
            <div key={session._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{session.title}</h3>
              <p>Tags: {session.tags.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No public sessions available at the moment.</p>
      )}
    </div>
  );
};

export default DashboardPage;