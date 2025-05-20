// Variables
let timer;
const API_URL = 'http://localhost:5000/api/blogs';
const statusMessage = document.getElementById('status-message');
let currentBlogId = null;

// DOM elements
const blogIdInput = document.getElementById('blog-id');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const tagsInput = document.getElementById('tags');
const saveDraftBtn = document.getElementById('save-draft-btn');
const publishBtn = document.getElementById('publish-btn');

// Auto-save function with debounce (5 seconds)
function setupAutoSave() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (titleInput.value || contentInput.value) {
            saveDraft(true);
        }
    }, 5000);
}

// Event listeners for auto-save
titleInput.addEventListener('input', setupAutoSave);
contentInput.addEventListener('input', setupAutoSave);
tagsInput.addEventListener('input', setupAutoSave);

// Manual save draft
saveDraftBtn.addEventListener('click', () => saveDraft(false));

// Publish blog
publishBtn.addEventListener('click', publishBlog);

// Save draft function
async function saveDraft(isAutoSave = false) {
    try {
        const blogData = {
            title: titleInput.value,
            content: contentInput.value,
            tags: tagsInput.value
        };
        
        // If editing an existing blog, include the ID
        if (currentBlogId) {
            blogData.id = currentBlogId;
        }
        
        const response = await fetch(`${API_URL}/save-draft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });
        
        const savedBlog = await response.json();
        
        // Update the blog ID if it's a new blog
        if (savedBlog && savedBlog._id && savedBlog._id.$oid) {
            currentBlogId = savedBlog._id.$oid;
            blogIdInput.value = currentBlogId;
        }
        
        // Show success message
        showStatusMessage(isAutoSave ? 'Auto-saved draft' : 'Draft saved successfully', isAutoSave ? 'autosave' : 'success');
        
    } catch (error) {
        console.error('Error saving draft:', error);
        showStatusMessage('Failed to save draft', 'error');
    }
}

// Publish blog function
async function publishBlog() {
    try {
        const blogData = {
            title: titleInput.value,
            content: contentInput.value,
            tags: tagsInput.value
        };
        
        // If editing an existing blog, include the ID
        if (currentBlogId) {
            blogData.id = currentBlogId;
        }
        
        const response = await fetch(`${API_URL}/publish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });
        
        const publishedBlog = await response.json();
        
        // Show success message
        showStatusMessage('Blog published successfully!', 'success');
        
        // Clear form after publishing (optional)
        // clearForm();
        
        // Or redirect to the blogs list page (optional)
        // setTimeout(() => {
        //     window.location.href = '/blogs';
        // }, 1500);
        
    } catch (error) {
        console.error('Error publishing blog:', error);
        showStatusMessage('Failed to publish blog', 'error');
    }
}

// Show status message function
function showStatusMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message';
    statusMessage.classList.add(type);
    
    // Auto-hide message after a few seconds
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, type === 'autosave' ? 2000 : 3000);
    
    // Make message visible
    statusMessage.style.display = 'block';
}

// Clear form function
function clearForm() {
    titleInput.value = '';
    contentInput.value = '';
    tagsInput.value = '';
    currentBlogId = null;
    blogIdInput.value = '';
}

// Check if we're editing an existing blog (from URL)
document.addEventListener('DOMContentLoaded', async function() {
    // Check for blog ID in URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    
    if (blogId) {
        try {
            // Fetch the blog data
            const response = await fetch(`${API_URL}/${blogId}`);
            const blog = await response.json();
            
            // Populate the form with blog data
            if (blog && blog._id) {
                titleInput.value = blog.title || '';
                contentInput.value = blog.content || '';
                tagsInput.value = blog.tags ? blog.tags.join(', ') : '';
                currentBlogId = blog._id.$oid;
                blogIdInput.value = currentBlogId;
            }
        } catch (error) {
            console.error('Error loading blog for editing:', error);
            showStatusMessage('Failed to load blog for editing', 'error');
        }
    }
})