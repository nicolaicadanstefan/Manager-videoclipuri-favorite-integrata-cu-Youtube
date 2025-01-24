import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Notification from '../common/Notifications';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [addingVideo, setAddingVideo] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  
  const { id } = useParams();
  const navigate = useNavigate();

  const extractYoutubeVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  useEffect(() => {
    setFilteredVideos(
      videos.filter(video =>
        video.titlu.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [videos, searchQuery]);

  useEffect(() => {
    if (id) {
      fetchVideos();
    }
  }, [id]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/playlists/${id}/videos`);
      if (!response.ok) {
        throw new Error('Nu s-au putut încărca videoclipurile');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      setNotification({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setNotification({ type: 'error', message: 'Te rog introdu un URL valid' });
      return;
    }

    setAddingVideo(true);
    try {
      const response = await fetch(`http://localhost:3000/api/playlists/${id}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urlYoutube: url
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Nu s-a putut adăuga videoclipul');
      }

      setUrl('');
      await fetchVideos();
      setNotification({ type: 'success', message: 'Video adăugat cu succes!' });
    } catch (error) {
      setNotification({ 
        type: 'error', 
        message: error.message
      });
    } finally {
      setAddingVideo(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/playlists/${id}/videos/${videoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Nu s-a putut șterge videoclipul');
      }

      setNotification({ type: 'success', message: 'Video șters cu succes!' });
      await fetchVideos();
    } catch (error) {
      setNotification({ 
        type: 'error', 
        message: error.message || 'A apărut o eroare la ștergerea videoclipului'
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Videoclipuri din Playlist</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Înapoi la Playlist-uri
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 p-2 border rounded-lg"
              required
            />
            <button 
              type="submit" 
              disabled={addingVideo}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {addingVideo ? 'Se adaugă...' : 'Adaugă Video'}
            </button>
          </div>
        </form>
      </div>

      <div className="search-container mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Caută videoclipuri după titlu..."
          className="search-input w-full p-3 border rounded-lg pl-10 focus:outline-none focus:border-blue-500"
        />
      </div>

      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {loading ? (
        <div className="text-center p-4">Se încarcă...</div>
      ) : filteredVideos.length === 0 ? (
        <p className="text-center text-gray-600">
          {searchQuery ? 'Nu s-au găsit videoclipuri care să corespundă căutării' : 'Nu există videoclipuri în acest playlist'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <a 
                href={video.urlYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.titlu} 
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </a>
              <div className="p-4">
                {/* Replace the existing title h3 element with this new version */}
                <h3 className="font-semibold mb-2">
                  <a 
                    href={video.urlYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {video.titlu}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">Durată: {video.durataFormatata}</p>
                <button 
                  onClick={() => handleDeleteVideo(video.id)}
                  className="delete-btn w-full text-white py-2 px-4 rounded transition-colors"
                >
                  Șterge Video
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoList;