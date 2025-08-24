# 📱 Social Media App

A full-stack social media application built with React frontend and Node.js backend.

## ✨ Features

- User authentication (JWT)
- Create and manage posts
- User profiles
- Responsive design
- RESTful API
- MongoDB database

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- MongoDB (local or cloud)

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd SocialMediaApp

# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

This will start:
- Backend API on http://localhost:5000
- Frontend on http://localhost:5173

## 🐳 Docker Deployment

### Quick Start with Docker
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker
```bash
# Build and run
docker build -t socialmedia-app .
docker run -p 5000:5000 --env-file .env socialmedia-app
```

## ☁️ Cloud Deployment

### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Deploy
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your-mongodb-uri
git push heroku main
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### Render
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

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

## 📁 Project Structure

```
SocialMediaApp/
├── backend/                 # Node.js API server
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── docker-compose.yml     # Docker services
├── Dockerfile            # Production Docker image
└── deploy.sh             # Deployment script
```

## 🛠️ Available Scripts

### Root Level
- `npm run install:all` - Install all dependencies
- `npm run dev` - Start development servers
- `npm run build` - Build frontend for production
- `npm run start` - Start production server
- `npm run deploy` - Build and start production

### Backend
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- CORS configuration
- Security headers
- Environment variable protection

## 📊 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/users/:id` - Get user profile
- `GET /api/health` - Health check

## 🚨 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Check URI and network access
2. **CORS Errors**: Verify CORS_ORIGIN setting
3. **Build Failures**: Check Node.js version compatibility

### Debug Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs backend

# Test API
curl http://localhost:5000/api/health
```

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [API Documentation](backend/README.md) - Backend API reference

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the deployment guide
3. Open an issue on GitHub

---

**Happy Coding! 🎉**
