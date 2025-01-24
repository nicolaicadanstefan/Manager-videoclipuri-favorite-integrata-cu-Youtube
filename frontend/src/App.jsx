import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlaylistList from './components/playlist/PlaylistList';
import PlaylistForm from './components/playlist/PlaylistForm';
import VideoList from './components/video/VideoList';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Manager Videoclipuri Favorite</h1>
        </header>
        <main className="app-main">
          <section className="form-section">
            <h2>Creează un playlist nou</h2>
            <PlaylistForm />
          </section>
          <section className="playlists-section">
            <h2>Playlist-urile tale</h2>
            <Routes>
              <Route path="/" element={<PlaylistList />} />
              <Route path="/playlist/:id/videos" element={<VideoList />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;