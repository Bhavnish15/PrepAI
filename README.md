# PrepAI

> **AI-Powered Interview Preparation Platform**  
> Master technical interviews with real-time AI feedback, personalized question analysis, and performance tracking.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-PrepAI-blue?style=for-the-badge&logo=vercel)](https://prepai.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)
[![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)](#)

---

## 🎯 Overview

PrepAI is a full-stack web application designed to help software engineers ace technical interviews. It leverages **Google's Gemini 2.0 Flash API** to provide intelligent question generation, real-time scoring, and detailed performance feedback.

Whether you're preparing for FAANG interviews or leveling up your coding skills, PrepAI offers:
- ⚡ **Instant AI Feedback** on your answers
- 📊 **Performance Analytics** with progress tracking
- 🎨 **Intuitive UI** with dark editorial design
- 🔄 **Real-time Scoring** with animated visualizations
- 📋 **Interview Timeline** with structured roadmap

---

## ✨ Key Features

### 🤖 AI-Powered Analysis
- Real-time answer evaluation using Gemini 2.0 Flash
- Detailed feedback on code quality, time complexity, and explanation clarity
- Personalized suggestions for improvement

### 📈 Performance Tracking
- Animated score ring visualization
- Session history and analytics dashboard
- Progress timeline with interview milestones
- Category-wise performance breakdown

### 🎨 Modern UI/UX
- Dark editorial design system
- Responsive across desktop, tablet, and mobile
- Smooth animations and micro-interactions
- Accessibility-first component architecture

### 💾 Data Persistence
- MongoDB Atlas for reliable data storage
- User session management with cookie-based authentication
- Interview history backup and retrieval

---

## 🏗️ Architecture

```
PrepAI
├── Frontend (React + Vite)
│   ├── Components (Dark Design System)
│   ├── State Management (Context API)
│   └── Animations (CSS + SVG)
│
├── Backend (Node.js + Express)
│   ├── API Routes (Interview, Auth, Analysis)
│   ├── Middleware (CORS, Authentication)
│   └── Gemini Integration (AI Scoring)
│
└── Database (MongoDB Atlas)
    ├── Users Collection
    ├── Interviews Collection
    └── Analytics Collection
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React, Vite, TailwindCSS | Fast, responsive UI |
| **Backend** | Node.js, Express | RESTful API server |
| **Database** | MongoDB Atlas | Cloud document database |
| **AI Engine** | Google Gemini 2.0 Flash | Real-time analysis & scoring |
| **Deployment** | Vercel (Frontend), Render (Backend) | Production hosting |
| **Authentication** | Cookie-based Sessions | Secure user management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/prepai.git
   cd prepai
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   ```

3. **Setup Backend**
   ```bash
   cd ../backend
   npm install
   cp .env.example .env
   ```

4. **Configure Environment Variables**

   **Frontend** (`.env.local`):
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

   **Backend** (`.env`):
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   ```

5. **Run Development Servers**

   Terminal 1 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

   Terminal 2 - Backend:
   ```bash
   cd backend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 🔧 Production Deployment

### Frontend (Vercel)
```bash
# Vercel auto-deploys from GitHub
# Ensure VITE_BACKEND_URL points to production backend
```

### Backend (Render)
```bash
# Push to GitHub, Render auto-deploys
# Set environment variables in Render dashboard
```

### Database (MongoDB Atlas)
- IP Whitelist: Add Render server IPs
- Connection String: Use MongoDB Atlas URI

---

## 📊 Key Implementation Details

### CORS & Authentication
- Cross-origin requests properly configured
- Cookie-based authentication for secure sessions
- Middleware to validate user tokens

### Data Validation
- Server-side validation of interview answers
- Duplicate key error handling
- Input sanitization for API safety

### Performance Optimization
- Web Vitals monitoring (LCP, TTI)
- Optimized bundle with Vite
- Lazy loading for interview questions
- Image optimization and caching

---

## 🎨 Design System

The frontend uses a cohesive dark editorial design system:
- **Primary Colors**: Deep slate with vibrant accents
- **Typography**: Clean sans-serif with editorial hierarchy
- **Components**: Reusable, accessible, animation-ready
- **Animations**: Smooth transitions and SVG-based visualizations

---

## 🐛 Troubleshooting

### CORS Issues
```bash
# Ensure backend CORS settings include frontend URL
FRONTEND_URL in .env matches your deployment
```

### MongoDB Connection
```bash
# Whitelist IP in MongoDB Atlas
# Verify connection string in .env
```

### Gemini API Errors
```bash
# Check API key is valid
# Verify quota and rate limits
# Review request schema matches Gemini 2.0 Flash spec
```

---

## 📈 Future Roadmap

- [ ] Video recording for interview answers
- [ ] Mock interview scheduling with live feedback
- [ ] Peer comparison analytics
- [ ] Custom interview templates
- [ ] Mobile app with offline support
- [ ] Integration with LeetCode/HackerRank

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 💬 Support & Questions

- 📧 Email: badal.bhavnish123@gmail.com
- 🐦 Twitter: https://x.com/mr_bhavnish
- 💼 LinkedIn: https://www.linkedin.com/in/bhavnishbhardwaj/
- 🐛 Issues: https://github.com/yourusername/prepai/issues

---

<div align="center">

**Built with ❤️ by Bhavnish Bhardwaj**

[⬆ Back to top](#prepai)

</div>
