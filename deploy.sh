#!/bin/bash

# 🚀 Social Media App Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from example..."
    if [ -f "backend/env.example" ]; then
        cp backend/env.example .env
        print_warning "Please update .env file with your production values"
        print_warning "Then run this script again"
        exit 1
    else
        print_error "No .env.example file found. Please create .env manually"
        exit 1
    fi
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js 18+ is required. Current version: $(node --version)"
    exit 1
fi

print_status "Node.js version: $(node --version)"

# Install dependencies
print_status "Installing dependencies..."
npm run install:all

# Build frontend
print_status "Building frontend..."
npm run build

# Check if build was successful
if [ ! -d "frontend/dist" ]; then
    print_error "Frontend build failed. Check the build output above."
    exit 1
fi

print_status "Frontend built successfully!"

# Start production server
print_status "Starting production server..."
NODE_ENV=production npm start
