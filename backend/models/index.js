// Import modelelor
const Playlist = require('./Playlist');
const Video = require('./Video');

// Definim relația One-to-Many intre Playlist și Video
// Un playlist poate avea multe videoclipuri
Playlist.hasMany(Video, {
    foreignKey: 'playlistId',
    // Cand o sa stergem un playlist, se va sterge si videoclipurile asociate acelui playlist
    onDelete: 'CASCADE'
});

// Un video aparține unui singur playlist
Video.belongsTo(Playlist, {
    foreignKey: 'playlistId'
});

// Exportăm modelele pentru a le folosi în aplicație
module.exports = {
    Playlist,
    Video
};