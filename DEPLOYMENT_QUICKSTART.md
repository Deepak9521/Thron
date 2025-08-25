# 🚀 Quick Start Deployment Guide

This guide will help you deploy the Social Media App quickly and easily.

## Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- Git

## Option 1: Docker Deployment (Recommended)

### Step 1: Clone and Setup
```bash
git clone <your-repo>
cd SocialMediaApp
```

### Step 2: Configure Environment
```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your production values
# Important: Change these values for production:
# - JWT_SECRET
# - MONGO_ROOT_PASSWORD
# - CORS_ORIGIN (your domain)
# - VITE_API_URL (your backend URL)
```

### Step 3: Start with Docker
```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Step 4: Access Your App
- Frontend: http://localhost:5173 (development)
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Option 2: Manual Deployment

### Step 1: Setup Environment
```bash
cp .env.example .env
# Edit .env with your values
```

### Step 2: Install Dependencies
```bash
npm run install:all
```

### Step 3: Build Frontend
```bash
npm run build
```

### Step 4: Start Production Server
```bash
npm run start:prod
```

## Option 3: Automated Script
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🔧 Environment Variables Quick Reference

### Required for Production:
```env
JWT_SECRET=your-super-secure-random-string
MONGO_ROOT_PASSWORD=your-strong-password
CORS_ORIGIN=https://yourdomain.com
VITE_API_URL=https://your-backend-domain.com/api
```

### MongoDB Options:
- **Local MongoDB**: Use default settings
- **MongoDB Atlas**: Update `MONGO_URI` in backend/.env
- **Docker MongoDB**: Uses the configured credentials

## 🚨 Common Issues & Solutions

### 1. Port Already in Use
```bash
# Check what's using port 5000
lsof -i :5000

# Or use different port in .env
PORT=5001
```

### 2. MongoDB Connection Issues
- Verify MongoDB is running
- Check connection string format
- Ensure network access if using cloud MongoDB

### 3. CORS Errors
- Set `CORS_ORIGIN` to your frontend domain
- Include protocol (http:// or https://)

### 4. Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
npm run install:all
```

## 📊 Health Check
Verify your deployment is working:
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK","environment":"production",...}
```

## 🔒 Security Checklist
- [ ] Changed default JWT secret
- [ ] Changed default MongoDB password
- [ ] Set up HTTPS (for production)
- [ ] Configured proper CORS origins
- [ ] Set up proper firewall rules

## 📞 Need Help?
1. Check the detailed [DEPLOYMENT.md](DEPLOYMENT.md)
2. Review application logs in `logs/` directory
3. Test API endpoints with curl or Postman
4. Verify environment variables are set correctly

## 🎉 Success!
Your Social Media App should now be running and accessible. Register a user account and start posting!
