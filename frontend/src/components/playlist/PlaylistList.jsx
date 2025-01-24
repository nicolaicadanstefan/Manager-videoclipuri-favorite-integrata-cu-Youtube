import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';
import Notification from '../common/Notifications';

function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:3000/api/playlists', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server response was not JSON');
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        setPlaylists(Array.isArray(data) ? data : []);
    } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/playlists/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete playlist');
        }
        
        await fetchPlaylists();
    } catch (error) {
        console.error('Delete error:', error);
        setError(error.message);
    }
  };

  const handlePlaylistClick = (id) => {
    navigate(`/playlist/${id}/videos`);
  };

  if (loading) return <div>Se încarcă...</div>;
  if (error) return <div className="error">Eroare: {error}</div>;

  return (
    <div className="playlists-container">
      {playlists.length === 0 ? (
        <p>Nu există playlist-uri. Creează unul nou!</p>
      ) : (
        playlists.map(playlist => (
          <PlaylistCard 
            key={playlist.id} 
            playlist={playlist}
            onDelete={handleDelete}
            onClick={() => handlePlaylistClick(playlist.id)}
          />
        ))
      )}
    </div>
  );
}

export default PlaylistList;