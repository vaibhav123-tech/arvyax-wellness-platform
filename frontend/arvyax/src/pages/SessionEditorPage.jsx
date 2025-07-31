/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import sessionService from "../services/sessionService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useCallback } from "react";
const SessionEditorPage = () => {
  const [sessionData, setSessionData] = useState({
    title: '',
        tags: '',
        json_file_url: '',
        image_url: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();
  const ismounted = useRef(false);
  const { title, tags, json_file_url ,image_url} = sessionData;
  const { sessionId } = useParams(); // Get sessionId from URL params if editing an existing session
  const autoSave = useCallback(async () => {
    setStatusMessage('Saving...');
    const dataToSave = {
        ...sessionData,
        tags: sessionData.tags.split(',').map(tag => tag.trim()),
        sessionId: sessionId || undefined,
        image_url: sessionData.image_url,
    };
    try {
        // Change this line to use your function name
        await sessionService.createSession(dataToSave); 
        setStatusMessage('Draft saved.');
    } catch (error) {
        setStatusMessage('Failed to save.');
        console.error("Error saving draft:", error);
    }
}, [sessionData, sessionId]);
 useEffect(() => {
        if (ismounted.current) {
            const timer = setTimeout(() => {
                if (sessionData.title) {
                    autoSave();
                }
            }, 10000); // 5-second delay

            return () => clearTimeout(timer);
        } else {
            ismounted.current = true;
        }
    }, [sessionData, autoSave]);
  useEffect(()=>{
    if(sessionId) {
      const fetchSession = async () => {
        try {
          const response = await sessionService.getSessionById(sessionId);
          setSessionData({
            title: response.data.title,
            tags: response.data.tags.join(', '), // Convert array to comma-separated string
            json_file_url: response.data.json_file_url,
          });} catch (error) {
          console.error("Error fetching session data:", error); }
          }
          fetchSession();
        }
  },[sessionId,navigate]);
  
  const onChange = (e) => {
    setSessionData((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value,
    })
  )};
  const onSubmit = async (e) => {
    e.preventDefault();
    const sessionData = {
      title,
      tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags to an array
      json_file_url,
      sessionId: sessionId || undefined,
      image_url
    };  
    try {
      await sessionService.createSession(sessionData);
      navigate('/my-sessions'); // Redirect to My Sessions page after saving
    } catch (error) {
      console.error("Error saving session draft:", error);
      // Optionally, you can show an error message to the user
    } }
    
  return (
    <div>
      <h1>Session Editor</h1>
      <p>This is the session editor page where you can create or edit sessions.</p>
      <form onSubmit={onSubmit}>
        <div>
          <label>
          Session Title:</label>
          <input
            type="text"
            name='title'
            value={title}
            onChange={onChange}/>
        </div>
        <div>
          <label>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={tags}
                onChange={onChange}
              />
        </div>
        <div>
          <label>JSON File URL</label>
                    <input
                        type="text"
                        name="json_file_url"
                        value={json_file_url}
                        onChange={onChange}
                    />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image_url"
            value={image_url}
            onChange={onChange}
          />
        </div>
        <button type="submit">Save Draft</button>

      </form>
      {/* Add your session editor form or components here */}
      {statusMessage && <p><i>{statusMessage}</i></p>}
      <button onClick={() => navigate('/my-sessions')}>Back to My Sessions</button>
    </div>
  );
}   
export default SessionEditorPage;