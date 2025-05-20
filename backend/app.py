from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from bson.json_util import dumps
from blog_model import save_or_update_blog, get_all_blogs, get_blogs_by_status, get_blog_by_id

# Initialize Flask app
app = Flask(__name__, 
            template_folder='templates',  # Add this line 
            static_folder='static')       # Add this line
CORS(app)  # Enable CORS for API requests

# Rest of the app.py code remains the same...

# Routes
@app.route('/')
def index():
    """Render the main blog editor page"""
    return render_template("index.html")

@app.route('/blogs')
def blogs_page():
    """Render the blogs list page"""
    return render_template("blogs.html")

# API Endpoints
@app.route('/api/blogs/save-draft', methods=['POST'])
def save_draft():
    """Save or update a blog as draft"""
    data = request.get_json()
    blog = save_or_update_blog(data, publish=False)
    return dumps(blog), 200

@app.route('/api/blogs/publish', methods=['POST'])
def publish():
    """Save and publish a blog"""
    data = request.get_json()
    blog = save_or_update_blog(data, publish=True)
    return dumps(blog), 200

@app.route('/api/blogs', methods=['GET'])
def all_blogs():
    """Get all blogs (with optional status filter)"""
    status = request.args.get('status')
    if status in ['draft', 'published']:
        blogs = get_blogs_by_status(status)
    else:
        blogs = get_all_blogs()
    return dumps(blogs), 200

@app.route('/api/blogs/<blog_id>', methods=['GET'])
def get_blog(blog_id):
    """Get a specific blog by ID"""
    blog = get_blog_by_id(blog_id)
    if blog:
        return dumps(blog), 200
    return jsonify({"error": "Blog not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)