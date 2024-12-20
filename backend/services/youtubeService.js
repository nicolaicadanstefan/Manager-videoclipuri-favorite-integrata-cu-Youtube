// Import biblioteca pentru a face cereri HTTP către API-ul YouTube
const axios = require('axios');

// Obtinem cheia API din variabilele de mediu
const API_KEY = process.env.YOUTUBE_API_KEY;

// Serviciul pentru interactiunea cu YouTube API
const youtubeService = {
    // Obtine informatii despre un video folosind ID-ul
    async getVideoDetails(videoId) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet,contentDetails',
                    id: videoId,
                    key: API_KEY
                }
            });

            if (response.data.items.length === 0) {
                throw new Error('Video nu a fost găsit');
            }

            const videoInfo = response.data.items[0];
            return {
                titlu: videoInfo.snippet.title,
                thumbnail: videoInfo.snippet.thumbnails.default.url,
                durata: videoInfo.contentDetails.duration,
                // Convertim durata din format ISO 8601 într-un format mai prietenos
                durataFormatata: this.formatDuration(videoInfo.contentDetails.duration)
            };
        } catch (error) {
            console.error('Eroare la obținerea detaliilor video:', error);
            throw error;
        }
    },

    // Extrage ID-ul videoclipului dintr-un URL YouTube
    extractVideoId(url) {
        const regex = /(?:youtube\.com\/watch\?v=|youtu.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    },

    // Converteste durata din format ISO 8601 în format MM:SS sau HH:MM:SS
    formatDuration(isoDuration) {
        const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        
        const hours = (match[1] || '').slice(0, -1);
        const minutes = (match[2] || '').slice(0, -1);
        const seconds = (match[3] || '').slice(0, -1);

        let time = [];
        
        if (hours) {
            time.push(hours.padStart(2, '0'));
        }
        time.push(minutes.padStart(2, '0') || '00');
        time.push(seconds.padStart(2, '0') || '00');
        
        return time.join(':');
    }
};

module.exports = youtubeService;