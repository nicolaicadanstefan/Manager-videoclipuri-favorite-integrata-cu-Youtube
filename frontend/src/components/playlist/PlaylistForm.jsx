import React, { useState } from 'react';
import Notification from '../common/Notifications';

function PlaylistForm() {
  const [formData, setFormData] = useState({
    nume: '',
    descriere: '',
    categorie: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setNotification({ type: 'success', message: 'Playlist creat cu succes!' });
        setFormData({
          nume: '',
          descriere: '',
          categorie: '',
          vizibilitate: true
        });
        window.location.reload();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'A apărut o eroare la crearea playlist-ului');
      }
    } catch (error) {
      setNotification({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <Notification type={notification.type} message={notification.message} />
      <form onSubmit={handleSubmit} className="playlist-form">
        <div className="form-group">
          <label htmlFor="nume">Nume</label>
          <input
            type="text"
            id="nume"
            name="nume"
            value={formData.nume}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descriere">Descriere</label>
          <textarea
            id="descriere"
            name="descriere"
            value={formData.descriere}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categorie">Categorie</label>
          <select
            id="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecteaza o categorie</option>
            <option value="Muzica">Muzica</option>
            <option value="Gaming">Gaming</option>
            <option value="Educatie">Educatie</option>
            <option value="Documentar">Documentar</option>
            <option value="Altele">Altele</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Se creeaza...' : 'Creeaza Playlist'}
        </button>
      </form>
    </div>
  );
}

export default PlaylistForm;