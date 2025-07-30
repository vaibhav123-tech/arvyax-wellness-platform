/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import sessionService from "../services/sessionService";
import { useEffect, useState } from "react";

const SessionEditorPage = () => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState({
    title: '',
        tags: '',
        json_file_url: '',
  });
  const { title, tags, json_file_url } = sessionData;
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
        <button type="submit">Save Draft</button>

      </form>
      {/* Add your session editor form or components here */}
      <button onClick={() => navigate('/my-sessions')}>Back to My Sessions</button>
    </div>
  );
}   
export default SessionEditorPage;