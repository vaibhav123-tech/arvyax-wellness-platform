import React, { useState, useEffect } from 'react';
import sessionService from '../services/sessionService';
import styles from './DashboardPage.module.css'; // Import the new CSS module

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
  }, []);

  if (loading) {
    return <div className={styles.centered}>Loading sessions...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
        <div className={styles.heroSection}>
            <h1 className={styles.heroTitle}>Discover Wellness, Reimagined</h1>
            <p className={styles.heroSubtitle}>
                Explore a collection of unique yoga and meditation sessions created by our community.
            </p>
        </div>
        
        <h2 className={styles.sessionsHeading}>Public Sessions</h2>

        {sessions.length > 0 ? (
            <div className={styles.sessionsGrid}>
                {sessions.map((session) => (
                    <div key={session._id} className={styles.sessionCard}>
                        {/* The image tag goes here, inside the single map loop */}
                        {session.image_url && <img src={session.image_url} alt={session.title} className={styles.cardImage} />}
                        
                        <h3 className={styles.cardTitle}>{session.title}</h3>
                        <p className={styles.cardTags}>Tags: {session.tags.join(', ')}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p className={styles.centered}>No public sessions available at the moment.</p>
        )}
    </div>
);
};

export default DashboardPage;