🎵 Moodify

Moodify is a web app that detects your facial expression through your webcam and plays songs that match your mood. Feeling happy? Get upbeat tracks. Feeling sad? Get calm, soothing music. No searching, no skipping, just look at the camera.

🚧 Status: Work in progress. Features and structure are changing every day.

✨ Features
😀 Real-time face expression detection using your webcam
🎧 Mood-based song playback
▶️ Built-in music player (play, pause, next, volume)
🔐 User authentication (register / login with JWT)
🔒 Privacy first: face detection runs in the browser and images are never stored
🧠 How It Works
User opens the app and allows camera access.
The webcam feed is analysed in the browser by a face-expression model.
The model returns the dominant emotion (for example happy or sad).
The emotion is mapped to a mood category.
Songs matching that mood are fetched and played.
Webcam → Face Detection → Emotion → Mood → Song List → Player
🛠️ Tech Stack
Layer	Technology
Frontend	React
Face detection	face-api.js / TensorFlow.js
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Auth	JWT, bcrypt, cookie-parser
📁 Project Structure
moodify/
├── backend/
├── frontend/
└── README.md
🚀 Getting Started
Prerequisites
Node.js (v18 or above)
MongoDB (local or Atlas)
A device with a working webcam
Backend
bash
cd backend
npm install
npm run dev

Create a .env file inside backend/:

env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
Frontend
bash
cd frontend
npm install
npm run dev
🗺️ Roadmap
 Project setup
 User authentication (register / login)
 Face expression detection
 Mood-based song playback
 Music player UI
 Favourite songs and mood history
👨‍💻 Author