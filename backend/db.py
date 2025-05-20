from pymongo import MongoClient

# Connect to MongoDB
# If using MongoDB Atlas, replace with your connection string
client = MongoClient('mongodb://localhost:27017/')
db = client.blog_database