#!/bin/bash

# 🚀 Social Media App Deployment Script
# This script automates the deployment process for production

set -e  # Exit on any error

echo "🚀 Starting production deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Please update .env file with your production values"
        print_warning "Then run this script again"
        exit 1
    else
        print_error "No .env.example file found. Please create .env manually"
        exit 1
    fi
fi

# Load environment variables
print_step "Loading environment variables..."
export $(grep -v '^#' .env | xargs)

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js 18+ is required. Current version: $(node --version)"
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "Environment: ${NODE_ENV:-production}"

# Install dependencies
print_step "Installing dependencies..."
npm run install:all

# Build frontend
print_step "Building frontend for production..."
npm run build

# Check if build was successful
if [ ! -d "frontend/dist" ]; then
    print_error "Frontend build failed. Check the build output above."
    exit 1
fi

print_status "Frontend built successfully!"

# Security check: Ensure JWT secret is changed
if [ "$JWT_SECRET" = "your-super-secret-jwt-key-change-this-in-production" ]; then
    print_warning "WARNING: Using default JWT secret. Please change JWT_SECRET in .env for production!"
fi

# Security check: Ensure MongoDB password is changed
if [ "$MONGO_ROOT_PASSWORD" = "password123" ]; then
    print_warning "WARNING: Using default MongoDB password. Please change MONGO_ROOT_PASSWORD in .env for production!"
fi

# Create logs directory if it doesn't exist
mkdir -p logs

print_step "Starting production server..."
print_status "Server will be available on port: ${PORT:-5000}"
print_status "API endpoint: http://localhost:${PORT:-5000}/api"

# Start production server with proper process management
NODE_ENV=production npm start
