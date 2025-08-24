# 🚀 Deployment Guide

This guide covers multiple deployment options for your Social Media App.

## 📋 Prerequisites

- Node.js 18+ and npm 8+
- MongoDB (local or cloud)
- Git

## 🐳 Docker Deployment (Recommended)

### Quick Start
```bash
# Clone and setup
git clone <your-repo>
cd SocialMediaApp

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker
```bash
# Build and run production container
docker build -t socialmedia-app .
docker run -p 5000:5000 --env-file .env socialmedia-app
```

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
- Add environment variables

### 4. Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

## 🔧 Environment Configuration

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=24h
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
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

- [ ] Change default JWT secret
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables
- [ ] Set up proper MongoDB authentication
- [ ] Enable rate limiting
- [ ] Set security headers

## 📊 Monitoring & Health Checks

- Health endpoint: `/api/health`
- Monitor logs and metrics
- Set up error tracking (Sentry)
- Database connection monitoring

## 🚨 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Check URI and network access
2. **CORS Errors**: Verify CORS_ORIGIN setting
3. **Build Failures**: Check Node.js version compatibility
4. **Port Conflicts**: Ensure ports are available

### Debug Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs backend

# Test API
curl http://localhost:5000/api/health

# Check environment
docker-compose exec backend env
```

## 📚 Additional Resources

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
