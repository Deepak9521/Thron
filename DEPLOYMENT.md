# 🚀 Deployment Guide

This guide covers multiple deployment options for your Social Media App.

## 📋 Prerequisites

- Node.js 18+ and npm 8+
- MongoDB (local or cloud)
- Git
- Docker and Docker Compose (for containerized deployment)

## 🐳 Docker Deployment (Recommended)

### Quick Start with Environment Variables
```bash
# Clone and setup
git clone <your-repo>
cd SocialMediaApp

# Copy and configure environment variables
cp .env.example .env
# Edit .env file with your production values

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker with Custom Configuration
```bash
# Build and run production container with custom environment
docker build -t socialmedia-app .
docker run -p 5000:5000 --env-file .env socialmedia-app
```

## 📝 Environment Configuration

### Main Configuration (.env)
```env
# Database Configuration
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your-secure-password-here
MONGO_DATABASE=socialmediaapp
MONGO_PORT=27017

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# Frontend Configuration
VITE_API_URL=https://your-backend-domain.com/api
FRONTEND_PORT=5173

# Optional: Logging
LOG_LEVEL=info
```

### Backend Configuration (backend/.env)
```env
# Copy from main .env or use environment-specific values
```

### Frontend Configuration (frontend/.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=Social Media App
VITE_APP_VERSION=1.0.0
```

## 🚀 Automated Deployment Script

Use the provided deployment script for easy production deployment:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
- Check for required Node.js version
- Validate environment configuration
- Install dependencies
- Build frontend for production
- Perform security checks
- Start the production server

## ☁️ Cloud Deployment Options

### 1. Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret
heroku config:set CORS_ORIGIN=https://your-app.herokuapp.com

# Deploy
git push heroku main
```

### 2. Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 3. Render
- Connect your GitHub repo
- Set build command: `npm run build`
- Set start command: `npm start`
- Add environment variables from .env.example

### 4. Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

## 📦 Manual Deployment

### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm install
npm run build
# Serve dist/ folder with nginx, Apache, or any static server
```

## 🔒 Security Checklist

- [ ] Change default JWT secret in production
- [ ] Use strong MongoDB passwords
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly for your domain
- [ ] Use environment variables (never hardcode secrets)
- [ ] Set up proper MongoDB authentication
- [ ] Enable rate limiting
- [ ] Set security headers
- [ ] Regular security updates

## 📊 Monitoring & Health Checks

- Health endpoint: `/api/health`
- Monitor application logs in `logs/` directory
- Set up error tracking (Sentry, LogRocket)
- Database connection monitoring
- Performance monitoring

## 🚨 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Check URI format and network access
2. **CORS Errors**: Verify CORS_ORIGIN setting matches your frontend domain
3. **Build Failures**: Check Node.js version compatibility (requires 18+)
4. **Port Conflicts**: Ensure ports 5000 and 5173 are available
5. **Environment Variables**: Verify all required variables are set in .env

### Debug Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend

# Test API health
curl http://localhost:5000/api/health

# Check environment variables
docker-compose exec backend env

# Test frontend build
cd frontend && npm run build && npx serve dist
```

## 🔧 Development vs Production

### Development
- Uses hot reloading
- Frontend runs on Vite dev server (port 5173)
- Backend runs with nodemon for auto-restart
- CORS allows all origins

### Production
- Frontend is built and served from backend
- Single port (5000) serves both API and frontend
- CORS restricted to specified domain
- Optimized for performance and security

## 📚 Additional Resources

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
