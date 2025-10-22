# AI-Moderation-Tool

Full-stack AI moderation platform with React frontend and Node.js backend.

## Tech Stack

**Frontend (Client/)**
- React + Vite
- Material-UI (MUI)
- React Router
- Stack Auth

**Backend (Server/)**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS configured

## Quick Start

### Local Development

**Backend**
```bash
cd Server
cp .env.example .env
# Configure your .env file
npm install
npm run dev
```

**Frontend**
```bash
cd Client
cp .env.example .env
# Configure your .env file
npm install
npm run dev
```

## Deployment

**Backend**: Render  
**Frontend**: Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## TODO

- user email whitelist + matching functions
- schema structures (model should be created just check for more info needed)
- api testing
- migrating routes from frontend to backend for security (mostly done)
- otherstuff i cant think of right now
