from db import db
from bson.objectid import ObjectId
from datetime import datetime

# Reference to the blogs collection
collection = db.blogs

def save_or_update_blog(data, publish=False):
    blog_id = data.get('id')
    
    # Prepare blog object
    blog = {
        "title": data.get("title", ""),
        "content": data.get("content", ""),
        "tags": [tag.strip() for tag in data.get("tags", "").split(',') if tag.strip()],
        "status": "published" if publish else "draft",
        "updated_at": datetime.utcnow()
    }
    
    # Update existing blog or create new one
    if blog_id:
        # Ensure blog_id is valid before updating
        try:
            collection.update_one({"_id": ObjectId(blog_id)}, {"$set": blog})
            return collection.find_one({"_id": ObjectId(blog_id)})
        except:
            # If ID is invalid, create new blog
            blog["created_at"] = datetime.utcnow()
            result = collection.insert_one(blog)
            return collection.find_one({"_id": result.inserted_id})
    else:
        # Create new blog
        blog["created_at"] = datetime.utcnow()
        result = collection.insert_one(blog)
        return collection.find_one({"_id": result.inserted_id})

def get_all_blogs():
    """Get all blogs sorted by updated_at date (newest first)"""
    return list(collection.find().sort("updated_at", -1))

def get_blogs_by_status(status):
    """Get blogs filtered by status (draft or published)"""
    return list(collection.find({"status": status}).sort("updated_at", -1))

def get_blog_by_id(blog_id):
    """Get a specific blog by ID"""
    try:
        return collection.find_one({"_id": ObjectId(blog_id)})
    except:
        return None