# Blog Editor Web App (Python + Flask + MongoDB)
This is a simple blog editor project built using Python Flask and MongoDB. It allows users to write blog posts, save them as drafts (manually or automatically every 5 seconds), and publish them. It was developed and tested using Visual Studio Code (VS Code).

## Features
* Create blog posts with title, content, and tags
* Auto-save draft every 5 seconds while typing
* Save draft manually
* Publish a blog post
* View and manage saved blogs using MongoDB Compass

## Technologies Used
* Python 3
* Flask
* MongoDB
* Visual Studio Code (IDE)

## Getting Started
Follow the steps below to set up and run the project locally on your machine.

### Prerequisites
* Python 3 installed
* MongoDB installed and running locally
* VS Code or any text editor

### Step 1: Set Up MongoDB
1. Open File Explorer and create a folder: `C:\data\db`
2. Open Command Prompt and run the following command to start MongoDB:
```
mongod
```
Leave this window open. MongoDB will now be listening on port 27017.

### Step 2: Set Up and Run the Flask App
1. Open VS Code and open the `blog_app` folder
2. Open the terminal and run the following commands:
```
python -m venv venv
venv\Scripts\activate      # For Windows

# source venv/bin/activate  # For macOS/Linux
pip install -r requirements.txt
```
3. Start the Flask app:
```
python app.py
```
You should see:
```
* Running on http://localhost:5000/
```

### Step 3: Use the Application
1. Open your browser and go to: `http://localhost:5000`
2. Enter a blog title, content, and tags
3. Click "Save as Draft" or "Publish"
4. Auto-save will also occur every 5 seconds of inactivity

### Step 4: View Saved Data in MongoDB
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Look for the database `blogDB`
4. Inside `blogDB`, open the `blogs` collection to view saved posts


