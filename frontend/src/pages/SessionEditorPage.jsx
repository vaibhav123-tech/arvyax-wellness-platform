import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sessionService from "../services/sessionService";
import styles from './SessionEditorPage.module.css';

const SessionEditorPage = () => {
    const [sessionData, setSessionData] = useState({
        title: '',
        tags: '',
        json_file_url: '',
        image_url: '',
    });
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const isMounted = useRef(false);

    const { title, tags, json_file_url, image_url } = sessionData;

    // Fetch data for editing
    useEffect(() => {
        if (sessionId) {
            const fetchSession = async () => {
                try {
                    const response = await sessionService.getSessionById(sessionId);
                    setSessionData({
                        title: response.data.title,
                        tags: response.data.tags.join(', '),
                        json_file_url: response.data.json_file_url,
                        image_url: response.data.image_url || '',
                    });
                } catch (error) {
                    console.error("Error fetching session data:", error);
                }
            };
            fetchSession();
        }
    }, [sessionId]);

    // Auto-save logic
    const autoSave = useCallback(async () => {
        setStatusMessage('Saving...');
        const dataToSave = {
            ...sessionData,
            tags: sessionData.tags.split(',').map(tag => tag.trim()),
            sessionId: sessionId || undefined,
        };
        try {
            await sessionService.createSession(dataToSave);
            setStatusMessage('Draft saved.');
        } catch (error) {
            setStatusMessage('Failed to save.');
            console.error("Error saving draft:", error);
        }
    }, [sessionData, sessionId]);

    // Auto-save timer
    useEffect(() => {
        if (isMounted.current) {
            const timer = setTimeout(() => {
                if (sessionData.title) {
                    autoSave();
                }
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            isMounted.current = true;
        }
    }, [sessionData, autoSave]);

    const onChange = (e) => {
        setSessionData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleManualSave = async (e) => {
        e.preventDefault();
        await autoSave();
        navigate('/my-sessions');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{sessionId ? 'Edit Session' : 'Create a New Session'}</h1>
                <form onSubmit={handleManualSave}>
                    <div>
                        <label className={styles.formLabel}>Session Title</label>
                        <input
                            type="text"
                            name='title'
                            value={title}
                            onChange={onChange}
                            className={styles.formInput}
                            placeholder="e.g., Morning Yoga Flow"
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.formLabel}>Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={onChange}
                            className={styles.formInput}
                            placeholder="e.g., yoga, beginner, mindfulness"
                        />
                    </div>
                    <div>
                        <label className={styles.formLabel}>JSON File URL</label>
                        <input
                            type="text"
                            name="json_file_url"
                            value={json_file_url}
                            onChange={onChange}
                            className={styles.formInput}
                            placeholder="https://example.com/flow.json"
                        />
                    </div>
                    <div>
                        <label className={styles.formLabel}>Image URL</label>
                        <input
                            type="text"
                            name="image_url"
                            value={image_url}
                            onChange={onChange}
                            className={styles.formInput}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.saveButton}>Save and Exit</button>
                        {statusMessage && <p className={styles.statusMessage}>{statusMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SessionEditorPage;