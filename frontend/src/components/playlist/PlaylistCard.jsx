import React from 'react';

function PlaylistCard({ playlist, onDelete, onClick }) {
  return (
    <div className="playlist-card-wrapper">
      <div className="playlist-card">
        <div className="playlist-header">
          <h3 className="playlist-title">{playlist.nume}</h3>
        </div>
        
        <div className="playlist-content">
          <p className="playlist-description">{playlist.descriere}</p>
          
          <div className="playlist-category">
            {playlist.categorie}
          </div>
          
          <div className="playlist-actions">
            <button 
              onClick={onClick}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Playlist Content
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(playlist.id);
              }}
              className="delete-btn flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;