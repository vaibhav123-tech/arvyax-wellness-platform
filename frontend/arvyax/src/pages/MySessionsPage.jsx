import React, { useEffect, useState } from "react";
import sessionService from "../services/sessionService";
import { useNavigate } from "react-router-dom";
import styles from "./MySessionPage.module.css"; // Import the new CSS module';

const MySessionsPage = () => {
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    const fetchSessions = async () => {
        try {
            const response = await sessionService.getMySessions();
            setSessions(response.data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
            navigate("/login");
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
                                <p className={styles.cardInfo}>Tags: {session.tags}</p>
                                
                                <div className={styles.cardActions}>
                                    <button className={styles.actionButton} onClick={() => navigate(`/editor/${session._id}`)}>Edit</button>
                                    
                                    {session.status === 'draft' && (
                                        <button className={styles.publishButton} onClick={() => handlePublishSession(session._id)}>
                                            Publish
                                        </button>
                                    )}
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