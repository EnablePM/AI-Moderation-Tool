# AI Moderation Tool - Frontend

React + Vite frontend for the AI Moderation Tool.

## Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Environment Variables

Required environment variables (see `.env.example`):

- `VITE_API_URL`: Backend API URL
- `VITE_STACK_PROJECT_ID`: Stack Auth project ID (if using)
- `VITE_STACK_PUBLISHABLE_KEY`: Stack Auth publishable key (if using)

## Build

```bash
npm run build
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) in the root directory for Vercel deployment instructions.
