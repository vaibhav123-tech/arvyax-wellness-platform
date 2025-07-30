/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import sessionService from "../services/sessionService";
import { useNavigate } from "react-router-dom";

const MySessionsPage = () => {
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();
    const fetchSessions = async () => {
            try {
                const response = await sessionService.getMySessions();
                setSessions(response.data);
            } catch (error) {
                console.error("Error fetching sessions:", error);
                // Redirect to login if token is invalid or expired
                navigate("/login");
            }
        };
    useEffect(() => {
        fetchSessions();
    }, [navigate]); 

    const handlepublishSession = async (sessionId) => {
        try{
            await sessionService.publishSession(sessionId);
        fetchSessions(); 
        }
        catch (error) {
            console.error("Error publishing session:", error);
            // Handle error, e.g., show a notification
        }
    }
    return (
        <div>
            <h1>My Sessions</h1>
            {/* Added a button to create new sessions */}
            <button onClick={() => navigate('/editor')}>Create New Session</button>
            <hr />
            {sessions.length > 0 ? (
                <ul>
                    {sessions.map((session) => (
                        <li key={session._id}>
                            {/* Corrected: Displaying fields that exist in the model */}
                            <h2>{session.title}</h2>
                            <p>Status: {session.status}</p>
                            <p>Tags: {session.tags.join(', ')}</p>
                            <button onClick={() => navigate(`/editor/${session._id}`)}>Edit</button>
                            {session.status === 'draft' && (
                                <button onClick={() => handlepublishSession(session._id)}>Publish</button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not created any sessions yet.</p>
            )}
        </div>
    );
};

export default MySessionsPage;