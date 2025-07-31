import React, { useState, useEffect } from 'react';
import sessionService from '../services/sessionService';
import styles from './DashboardPage.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

  // This block renders the placeholder UI while data is loading
  if (loading) {
    console.log('Loading public sessions...');
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}><Skeleton width={400} /></h1>
          <p className={styles.heroSubtitle}><Skeleton count={2} /></p>
        </div>
        <h2 className={styles.sessionsHeading}><Skeleton width={250} /></h2>
        <div className={styles.sessionsGrid}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.sessionCard}>
              <Skeleton height={180} />
              <h3 className={styles.cardTitle}><Skeleton /></h3>
              <p className={styles.cardTags}><Skeleton width={150} /></p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // This is the final UI after data has loaded
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