const axios = require('axios');
const API_KEY = process.env.YOUTUBE_API_KEY;

const youtubeService = {
    async getVideoDetails(videoId) {
        try {
            if (!API_KEY) {
                console.error('YouTube API Key is missing');
                throw new Error('YouTube API configuration is missing');
            }

            console.log('Attempting to fetch video details with ID:', videoId);
            console.log('API Key exists:', !!API_KEY);

            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
                params: {
                    part: 'snippet,contentDetails',
                    id: videoId,
                    key: API_KEY
                }
            }).catch(error => {
                console.error('YouTube API Error Response:', error.response?.data);
                throw error;
            });

            if (!response.data.items || response.data.items.length === 0) {
                throw new Error('Video not found on YouTube');
            }

            const videoInfo = response.data.items[0];
            const details = {
                titlu: videoInfo.snippet.title,
                thumbnail: videoInfo.snippet.thumbnails.default.url,
                durata: videoInfo.contentDetails.duration,
                durataFormatata: this.formatDuration(videoInfo.contentDetails.duration)
            };

            console.log('Successfully retrieved video details:', details);
            return details;

        } catch (error) {
            console.error('Full error in getVideoDetails:', {
                message: error.message,
                response: error.response?.data,
                stack: error.stack
            });
            throw new Error('Nu s-au putut obține detaliile videoclipului');
        }
    },

    formatDuration(duration) {
        try {
            const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
            const hours = (match[1] || '').replace('H', '');
            const minutes = (match[2] || '').replace('M', '') || '0';
            const seconds = (match[3] || '').replace('S', '') || '0';
            
            return `${hours ? hours + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        } catch (error) {
            console.error('Error formatting duration:', error);
            return '00:00';
        }
    },

    extractVideoId(url) {
        if (!url) return null;
        
        try {
            const urlObj = new URL(url);
            const searchParams = new URLSearchParams(urlObj.search);
            const videoId = searchParams.get('v');
            
            if (videoId) {
                console.log('Extracted video ID:', videoId);
                return videoId;
            }
            
            if (urlObj.hostname === 'youtu.be') {
                const videoId = urlObj.pathname.slice(1);
                console.log('Extracted video ID from youtu.be:', videoId);
                return videoId;
            }
        } catch (error) {
            console.error('Error extracting video ID:', error);
        }
        return null;
    }
};

module.exports = youtubeService;