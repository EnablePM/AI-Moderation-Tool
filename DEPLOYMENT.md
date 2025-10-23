# Deployment Guide

## Overview
- **Backend**: Render
- **Frontend**: Vercel
- **Database**: MongoDB Atlas (recommended)

## Backend Deployment (Render)

### Prerequisites
1. Create a MongoDB Atlas account and database
2. Create a Render account at https://render.com

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Render and Vercel deployment"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `ai-moderation-tool-backend`
     - **Region**: Choose closest to your users
     - **Branch**: `main`
     - **Root Directory**: `Server`
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Set Environment Variables**
   In Render dashboard → Environment:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string
   - `JWT_EXPIRES_IN`: `7d`
   - `FRONTEND_URL`: (Add after Vercel deployment - your Vercel URL)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-app-name.onrender.com`

## Frontend Deployment (Vercel)

### Prerequisites
1. Create a Vercel account at https://vercel.com
2. Have your Render backend URL ready

### Steps

1. **Deploy to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `Client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

2. **Set Environment Variables**
   In Vercel → Settings → Environment Variables:
   - `VITE_API_URL`: Your Render backend URL + `/api` (e.g., `https://your-app-name.onrender.com/api`)
   - `VITE_STACK_PROJECT_ID`: Your Stack project ID (if using Stack Auth)
   - `VITE_STACK_PUBLISHABLE_KEY`: Your Stack publishable key (if using Stack Auth)

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Note your frontend URL: `https://your-app.vercel.app`

4. **Update Backend CORS**
   - Go back to Render dashboard
   - Add environment variable:
     - `FRONTEND_URL`: Your Vercel URL (e.g., `https://your-app.vercel.app`)
   - Render will automatically redeploy

## Local Development

### Backend
```bash
cd Server
cp .env.example .env
# Edit .env with your local MongoDB and other settings
npm install
npm run dev
```

### Frontend
```bash
cd Client
cp .env.example .env
# Edit .env with your local API URL
npm install
npm run dev
```

## Verification

1. **Backend Health Check**
   - Visit: `https://your-render-app.onrender.com/`
   - Should return JSON with status "running"

2. **Frontend**
   - Visit your Vercel URL
   - Should load the application
   - Test authentication flow

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check browser console for exact origin being blocked

### Backend Not Connecting
- Verify `VITE_API_URL` in Vercel includes `/api` suffix
- Check Render logs for errors

### Database Connection Failed
- Verify MongoDB Atlas connection string
- Ensure IP whitelist includes `0.0.0.0/0` for Render's dynamic IPs
- Check database user credentials

### First Request Slow on Render (Free Tier)
- Render free tier spins down after inactivity
- First request after inactivity takes ~30 seconds to wake up
- Consider upgrading to paid tier for 24/7 uptime

