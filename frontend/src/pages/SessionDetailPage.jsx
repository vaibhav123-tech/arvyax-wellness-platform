/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import sessionService from '../services/sessionService';
import styles from './SessionDetailPage.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';

const SessionDetailPage = () => {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState(null);

    
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await sessionService.getSessionByIdPublic(sessionId);
                setSession(response.data);
                if(response.data.title){
                    const articleResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/external/articles/${response.data.title}`);
                    setArticles(articleResponse.data);
                }
            } catch (error) {
                console.error("Failed to fetch session", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, [sessionId]);

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.sessionWrapper}>
                    <h1><Skeleton width={400} /></h1>
                    <Skeleton height={300} />
                    <p><Skeleton count={4} /></p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.sessionWrapper}>
                    <h2>Session Not Found</h2>
                    <Link to="/" className={styles.backLink}>Back to Dashboard</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.sessionWrapper}>
                {session.image_url && <img src={session.image_url} alt={session.title} className={styles.mainImage}/>}
                <h1 className={styles.title}>{session.title}</h1>
                <p className={styles.tags}>Tags: {session.tags.join(', ')}</p>
                <hr className={styles.divider} />

                <h2 className={styles.relatedTitle}>Related Articles</h2>
                {articles.length > 0 ? (
                    <div className={styles.articlesContainer}>
                        {articles.map((article, index) => (
                            <a href={article.url} key={index} target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                                {article.image && <img src={article.image} alt={article.title} className={styles.articleImage} />}
                                <div className={styles.articleContent}>
                                    <h3 className={styles.articleTitle}>{article.title}</h3>
                                    <p className={styles.articleSource}>{article.source.name}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p>No related articles found.</p>
                )}
                <Link to="/" className={styles.backLink}>Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default SessionDetailPage;