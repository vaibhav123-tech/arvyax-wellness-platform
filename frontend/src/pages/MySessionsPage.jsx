import React, { useEffect, useState } from "react";
import sessionService from "../services/sessionService";
import { useNavigate } from "react-router-dom";
import styles from './MySessionPage.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MySessionsPage = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    const fetchSessions = async () => {
        try {
            const response = await sessionService.getMySessions();
            setSessions(response.data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handlePublishSession = async (sessionId) => {
        try {
            await sessionService.publishSession(sessionId);
            fetchSessions();
        } catch (error) {
            console.error("Error publishing session:", error);
        }
    };

    const handleDelete = async (sessionId) => {
        if (window.confirm('Are you sure you want to delete this session?')) {
            setDeletingId(sessionId);
            try {
                await sessionService.deleteSession(sessionId);
                fetchSessions();
            } catch (error) {
                console.error("Failed to delete session:", error);
                alert('Failed to delete session.');
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}><Skeleton width={300} /></h1>
                    <Skeleton height={48} width={180} />
                </div>
                <div className={styles.sessionsGrid}>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className={styles.sessionCard}>
                            <Skeleton height={200} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}><Skeleton /></h2>
                                <p className={styles.cardInfo}><Skeleton width={100} /></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>My Wellness Sessions</h1>
                <button className={styles.createButton} onClick={() => navigate('/editor')}>
                    + Create New Session
                </button>
            </div>
            
            {sessions.length > 0 ? (
                <div className={styles.sessionsGrid}>
                    {sessions.map((session) => (
                        <div key={session._id} className={styles.sessionCard}>
                            {session.image_url && <img src={session.image_url} alt={session.title} className={styles.cardImage} />}
                            
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{session.title}</h2>
                                <p className={styles.cardInfo}>Status: {session.status}</p>
                                
                                <div className={styles.cardActions}>
                                    <button className={styles.actionButton} onClick={() => navigate(`/editor/${session._id}`)}>Edit</button>
                                    
                                    {session.status === 'draft' && (
                                        <button className={styles.publishButton} onClick={() => handlePublishSession(session._id)}>
                                            Publish
                                        </button>
                                    )}
                                    
                                    <button 
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(session._id)}
                                        disabled={deletingId === session._id}
                                    >
                                        {deletingId === session._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noSessionsText}>You haven't created any sessions yet. Click the button above to get started!</p>
            )}
        </div>
    );
};

export default MySessionsPage;