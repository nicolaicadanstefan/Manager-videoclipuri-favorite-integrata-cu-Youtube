# Manager Videoclipuri Favorite integrat cu YouTube

## Descriere
Acest proiect este realizat în cadrul disciplinei **Tehnologii Web** și are ca scop dezvoltarea unei aplicații web pentru gestionarea videoclipurilor favorite de pe YouTube. Aplicația permite utilizatorilor să își organizeze videoclipurile favorite în playlist-uri personalizate.

## Tehnologii utilizate

### Back-end
- Node.js
- Express.js
- Sequelize - (ORM pentru SQLite)
- SQLite (bază de date)

### Front-end
- React.js

### Integrare externă
- YouTube Data API v3 - API pentru interacțiunea cu YouTube

## Entități principale

### Playlist (entitate părinte)
| Câmp | Tip | Descriere |
|------|-----|-----------|
| ID | Number (Primary Key) | Identificator unic generat automat pentru fiecare playlist |
| Nume | String [Required] | Numele playlist-ului (ex: "Muzică favorită", "Tutoriale", "Gameplay-uri") |
| Descriere | Text | O descriere detaliată a playlist-ului |
| Data creării | DateTime | Data și ora când a fost creat playlist-ul (se generează automat) |
| Categorie | String | Categoria din care face parte (ex: "Muzică", "Educație", "Gaming", "Documentar", etc.) |
| Vizibilitate | Boolean | true / false (Playlist public / privat) |

### Video (entitate copil)
| Câmp | Tip | Descriere |
|------|-----|-----------|
| ID | Number (Primary Key) | Identificator unic generat automat pentru fiecare video |
| ID Playlist | Number (Foreign Key) | Referință către playlist-ul părinte |
| Titlu | String | Titlul videoclipului preluat din YouTube |
| URL YouTube | String | Link-ul complet către videoclipul de pe YouTube (Format: https://www.youtube.com/watch?v=XXXXXX) |
| Thumbnail | String | URL către imaginea de previzualizare a videoclipului |
| Data adăugării | DateTime | Data și ora când a fost adăugat videoclipul (se generează automat) |
| Durata | String | Durata videoclipului (ex: "13:37", "1:02:45") |
| Status | Boolean | true / false (Video vizionat / nevizionat) |

## Structura proiectului
```bash
proiect-tw/
├── backend/
│   ├── config/
│   │   └── db.js           # Configurare baza de date
│   ├── models/
│   │   ├── Playlist.js     # Model Playlist
│   │   └── Video.js        # Model Video
│   ├── routes/
│   │   ├── playlists.js    # Rute playlist
│   │   └── videos.js       # Rute video
│   ├── controllers/
│   │   ├── playlistController.js
│   │   └── videoController.js
│   ├── server.js           # Server principal
│   └── .env                # Variabile pentru mediu
├── frontend/
│   ├── src/
│   │   ├── components/     # Componente React
│   │   ├── pages/         # Pagini aplicație
│   │   ├── services/      # Servicii API
│   │   └── App.js         # Componenta principală
│   ├── public/
│   └── package.json
├── database/
│   ├── playlists.db       # Baza de date SQLite
│   └── migrations/        # Migrări
└── README.md              # Documentație
```

## Funcționalități planificate

### Back-end
- [x] Configurare proiect Node.js și Express
- [x] Implementare modele de date
- [x] API RESTful pentru playlist-uri și videoclipuri
- [x] Integrare YouTube API
- [ ] Sistem de validare URL-uri

### Front-end
- [ ] Interfață utilizator React
- [ ] Sistem de management playlist-uri
- [ ] Preview videoclipuri
- [ ] Sistem căutare și filtrare
- [ ] Design responsive

## Instrucțiuni de Rulare

### Configurare
1. Clonează repository-ul:
   ```bash
   - git clone https://github.com/nicolaicadanstefan/Manager-videoclipuri-favorite-integrata-cu-Youtube.git
   - cd proiect-tw/backend/
   - npm install
   - Adaugam valori variabilelor din .env (PORT=3000, YOUTUBE_API_KEY=cheia api-ul pentru youtube)
   - Pornim serverul (npm run dev)

### Endpoint-uri API disponibile
1.Playlist-uri
- GET /api/playlists - Obtine toate playlist-urile
- POST /api/playlists - Creeaza un playlist nou
- GET /api/playlists/:id - Obtine un playlist specific
- PUT /api/playlists/:id - Actualizeaza un playlist
- DELETE /api/playlists/:id - Sterge un playlist

2. Videoclip-uri
- POST /api/playlists/:playlistId/videos - Adauga un video într-un playlist
- GET /api/playlists/:playlistId/videos - Obtine toate videourile dintr-un playlist
- PUT /api/videos/:id/status - Actualizeaza statusul unui video
- DELETE /api/videos/:id - Sterge un video