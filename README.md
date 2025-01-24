# Manager Videoclipuri Favorite integrat cu YouTube

## Descriere
Acest proiect este realizat în cadrul disciplinei **Tehnologii Web** si are ca scop dezvoltarea unei aplicatii web pentru gestionarea videoclipurilor favorite de pe YouTube. Aplicatia permite utilizatorilor sa isi organizeze videoclipurile favorite în playlist-uri personalizate.

## Tehnologii utilizate

### Back-end
- Node.js cu Express.js
- Sequelize ORM
- SQLite (baza de date)
- YouTube Data API v3

### Front-end
- React.js
- React Router pentru navigare
- Tailwind CSS pentru stilizare

## Entitati principale

### Playlist (entitate parinte)
| Câmp | Tip | Descriere |
|------|-----|-----------|
| ID | Number (Primary Key) | Identificator unic generat automat pentru fiecare playlist |
| Nume | String [Required] | Numele playlist-ului (ex: "Muzica favorita", "Tutoriale", "Gameplay-uri") |
| Descriere | Text | O descriere detaliata a playlist-ului |
| Data crearii | DateTime | Data si ora când a fost creat playlist-ul (se genereaza automat) |
| Categorie | String | Categoria din care face parte (ex: "Muzica", "Educatie", "Gaming", "Documentar", etc.) |
| Vizibilitate | Boolean | true / false (Playlist public / privat) |

### Video (entitate copil)
| Câmp | Tip | Descriere |
|------|-----|-----------|
| ID | Number (Primary Key) | Identificator unic generat automat pentru fiecare video |
| ID Playlist | Number (Foreign Key) | Referinta catre playlist-ul parinte |
| Titlu | String | Titlul videoclipului preluat din YouTube |
| URL YouTube | String | Link-ul complet catre videoclipul de pe YouTube (Format: https://www.youtube.com/watch?v=XXXXXX) |
| Thumbnail | String | URL catre imaginea de previzualizare a videoclipului |
| Data adaugarii | DateTime | Data si ora când a fost adaugat videoclipul (se genereaza automat) |
| Durata | String | Durata videoclipului (ex: "13:37", "1:02:45") |
| Status | Boolean | true / false (Video vizionat / nevizionat) |

## Structura proiectului
```bash
proiect-tw/
├── backend/                      # Director pentru codul server-side al aplicatiei
│   ├── config/                   # Configuratii pentru diferite parti ale aplicatiei
│   │   └── db.js                # Stabileste conexiunea cu baza de date SQLite si configureaza Sequelize ORM
│   │
│   ├── models/                   # Definitiile structurilor de date pentru baza de date
│   │   ├── index.js             # Punct central pentru exportul tuturor modelelor si stabilirea relatiilor dintre ele
│   │   ├── Playlist.js          # Defineste schema pentru entitatea Playlist (nume, descriere, categorie etc.)
│   │   └── Video.js             # Defineste schema pentru entitatea Video (titlu, URL, durata etc.)
│   │
│   ├── routes/                   # Definirea rutelor API pentru manipularea datelor
│   │   ├── playlists.js         # Gestioneaza endpoint-urile pentru operatiile CRUD pe playlist-uri (/api/playlists)
│   │   └── videos.js            # Gestioneaza endpoint-urile pentru operatiile CRUD pe videoclipuri (/api/playlists/:id/videos)
│   │
│   ├── controllers/             # Logica de business pentru manipularea datelor
│   │   ├── playlistController.js # Implementeaza operatiile pentru playlist-uri (creare, citire, actualizare, stergere)
│   │   └── videoController.js    # Implementeaza operatiile pentru videoclipuri (adaugare în playlist, stergere etc.)
│   │
│   ├── services/                # Servicii auxiliare pentru functionalitati specifice
│   │   └── youtubeService.js    # Gestioneaza interactiunea cu YouTube API (extragere informatii video)
│   │
│   ├── server.js                # Punctul de intrare în aplicatia backend - configureaza serverul Express si middleware-urile
│   └── .env                     # Stocheaza variabile de mediu (port server, cheia API YouTube etc.)
│
├── frontend/                     # Director pentru codul client-side al aplicatiei
│   ├── public/                  # Fisiere statice accesibile public
│   │   └── index.html          # Pagina HTML principala care încarca aplicatia React
│   │
│   ├── src/                     # Codul sursa pentru aplicatia React
│   │   ├── components/         # Componente React reutilizabile
│   │   │   └── common/         # Componente comune folosite în mai multe parti ale aplicatiei
│   │   │         └── Notifications.jsx  # Componenta pentru afisarea mesajelor de succes/eroare
│   │   │
│   │   ├── Playlist/           # Componente specifice pentru gestionarea playlist-urilor
│   │   │   ├── PlaylistCard.jsx    # Afiseaza un playlist individual cu optiuni de management
│   │   │   ├── PlaylistForm.jsx    # Formular pentru crearea/editarea unui playlist
│   │   │   └── PlaylistList.jsx    # Afiseaza lista tuturor playlist-urilor
│   │   │
│   │   └── video/              # Componente specifice pentru gestionarea videoclipurilor
│   │       └── VideoList.jsx    # Afiseaza si gestioneaza videoclipurile dintr-un playlist
│   │
│   ├── styles/                  # Fisiere CSS pentru stilizarea aplicatiei
│   │   └── main.css            # Stiluri globale si specifice componentelor
│   │
│   ├── App.jsx                 # Componenta principala React care defineste structura aplicatiei
│   ├── index.js                # Punctul de intrare în aplicatia React
│   └── package.json            # Configurare proiect frontend si dependinte
│
├── database/                    # Director pentru fisierele bazei de date
│   ├── playlists.db           # Baza de date SQLite care stocheaza toate informatiile aplicatiei
│
└── README.md                   # Documentatia proiectului cu instructiuni de instalare si utilizare
```

## Functionalitati planificate

### Back-end
- [x] Configurare proiect Node.js si Express
- [x] Implementare modele de date
- [x] API RESTful pentru playlist-uri si videoclipuri
- [x] Integrare YouTube API
- [x] Sistem de validare URL-uri

### Front-end
- [x] Interfata utilizator React
- [x] Sistem de management playlist-uri
- [x] Preview videoclipuri
- [x] Sistem cautare videoclipuri in playlist
- [x] Design responsive

## Instructiuni de Rulare

### Configurare si Rurale
1. Cerințe preliminare
- Node.js (v14 sau mai recent)
- npm (Node Package Manager)
- Cheie API YouTube Data API v3

### Configurare
1. Cloneaza repository-ul:
   ```bash
   - git clone https://github.com/nicolaicadanstefan/Manager-videoclipuri-favorite-integrata-cu-Youtube.git
   - Adaugam valori variabilelor din .env (PORT=3000, YOUTUBE_API_KEY=cheia api-ul pentru youtube)
   - cd proiect-tw/backend/
   - npm install
   - Pornim serverul (npm run dev sau npm start)
   - cd proiect-tw/frontend/
   - npm install
   - npm start
   - daca apare un mesaj in terminal pentru creearea proiectului in orice
   - Aplicatia v-a rula pe backend (port 3000) si pe frontend (port 3001)

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
- PUT /api/playlists/:playlistId/videos/:id/status - Actualizeaza statusul unui video
- DELETE /api/playlists/:playlistId/videos/:id - Sterge un video