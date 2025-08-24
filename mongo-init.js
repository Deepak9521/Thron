// MongoDB initialization script
db = db.getSiblingDB('socialmediaapp');

// Create collections
db.createCollection('users');
db.createCollection('posts');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.posts.createIndex({ "author": 1 });
db.posts.createIndex({ "createdAt": -1 });

print('✅ MongoDB initialized successfully');
