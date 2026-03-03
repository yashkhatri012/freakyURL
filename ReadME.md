# freakyUrl

Make your URLs look suspicious and "freaky" with custom phrases while maintaining secure redirects. Share links that make people wonder what they're clicking on.

## Overview

freakyUrl lets you transform ordinary URLs into suspicious looking shortened links with custom phrases. Add phrases like "virus-in-the-file" or "totally-not-a-scam" to any URL the phrase is cosmetic and purely for fun, while a unique nanoid identifier powers the actual redirect. The backend generates and stores the slug, while the frontend handles redirection from its own domain. The project was built to explore system design, URL mechanics and caching with Redis.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Frontend:** React with Vite
- **ID Generation:** nanoid
- **Caching:** Redis
- **Deployment:** Vercel and Railway

---

## Project Structure

```
freakyUrl/
├── client/                          # React + Vite Frontend (Vercel)
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── LinkForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── Toast.jsx
│   │   ├── config/
│   │   │   └── constants.js
│   │   ├── pages/
│   │   │   └── RedirectPage.jsx
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Root.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── README.md
│
├── server/                          # Node.js + Express Backend (Render)
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── redis.js
│   │   ├── models/
│   │   │   └── Url.js
│   │   └── utils/
│   │       └── blockedExtensions.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── .git/
├── .gitignore
├── .vscode/
├── README.md
├── package.json

```

### Key Directories Explained

**`/client`** - React + Vite frontend application

- Handles URL creation form
- Displays shortened URLs with frontend domain
- Handles dynamic `/:slug` routes for redirects
- Deployed on Vercel

**`/server`** - Node.js + Express backend API

- `POST /shorten` - Create shortened URL
- `GET /:slug` - Resolve slug to original URL
- Manages MongoDB database
- Handles Redis caching
- Deployed on Render

**`/src`** (server) - Source code

- `app.js` - Express routes and middleware
- `config/` - Database and cache connections
- `models/` - Mongoose schemas
- `utils/` - Helper functions

---

## Architecture Overview

### How It Works

1. **Creating a Short URL**
   - User enters a long URL and custom phrase in the frontend
   - Frontend validates the URL
   - Frontend sends to `POST /shorten` on backend
   - Backend generates a slug combining phrase + unique ID
   - Backend stores in MongoDB and returns the slug
   - Frontend constructs full URL with its own domain: `https://frky.vercel.app/{slug}`

2. **Following a Short URL**
   - User visits: `https://frky.vercel.app/my-phrase-abc123`
   - React Router on frontend matches `/:slug` route
   - RedirectPage component loads and shows spinner
   - Frontend calls `GET /{slug}` on backend
   - Backend checks Redis cache, then MongoDB
   - Backend returns the original long URL
   - Frontend redirects user using `window.location.href`

### Key Features

✅ **Frontend-Based Redirects** - Short URLs are on the frontend domain  
✅ **API-Only Backend** - No redirects on backend, just JSON responses  
✅ **Redis Caching** - Fast resolution for frequently accessed URLs  
✅ **Custom Phrases** - Make URLs "freaky" with custom text  
✅ **Blocked Extensions** - Prevents shortened links to dangerous file types  
✅ **URL Validation** - Validates URLs before shortening


---

## Deployment

### Backend (Render)

- Platform: Railway.com

- Runs Node.js + Express server
- Connected to MongoDB and Redis

### Frontend (Vercel)

- Platform: Vercel
- URL: `https://frky.vercel.app`
- Runs React + Vite SPA
- Includes `vercel.json` for client-side routing

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Redis

### Local Development

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (in another terminal)
cd client
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`  
Backend API will be available at `http://localhost:5000`

---

## Environment Variables

### Backend (`server/.env`)

Create a `.env` file in the `server` 

```env
# Database
MONGODB_URI=mongodb://localhost:27017/freakyurl

# Cache
REDIS_URL=redis://localhost:6379

# Server
NODE_ENV=development
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Frontend (`client/.env` or `client/.env.local`)

```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

For production (Vercel):

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

See `.env.example` files in both `server/` and `client/` directories for all available options.

---

## API Routes

### Backend Routes

#### Create Short URL

```
POST /api/shorten
Content-Type: application/json

{
  "longUrl": "https://example.com/very/long/path",
  "phrase": "my-awesome-link"
}

Response: 201 Created
{
  "slug": "my-awesome-link-abc123"
}
```

#### Resolve Short URL

```
GET /api/resolve/:slug

Response: 200 OK
{
  "longUrl": "https://example.com/very/long/path"
}

Response: 404 Not Found
{
  "error": "Link not found"
}
```

#### Health Check

```
GET /health

Response: 200 OK
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": 1696123456789
}
```

### Frontend Routes

```
/                    → Home page (create short URLs)
/:slug               → Redirect page (resolves and redirects to long URL)
```

---

## Technologies Used

### Frontend

- **React 19** - UI framework
- **React Router v7** - Client-side routing
- **Vite** - Build tool and dev server

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB + Mongoose** - Database
- **Redis** - Caching layer
- **nanoid** - ID generation

### DevOps & Deployment

- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **MongoDB Atlas** - Managed database
- **Redis Cloud** - Managed cache

---

## Learning Resources

- [This YT videio by NeetCodeIO](https://youtu.be/qSJAvd5Mgio?si=sxxEzMIopY-FjGbE)
- [Recommended Reading](https://www.freecodecamp.org/news/build-a-scalable-url-shortener-with-distributed-caching-using-redis/)

---

## Contributing

Feel free to submit issues and enhancement requests!

---

## License

This project is open source and available under the MIT License.

