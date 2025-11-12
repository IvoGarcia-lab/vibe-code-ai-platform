# Vibe Code 🎨🤖

A modern AI-powered platform for creative professionals. Built with React, Node.js, and Gemini AI to help unlock creative potential.

## 🌟 Features

- **Interactive AI Interface**: Test Gemini AI capabilities with creative prompts
- **Multiple Creative Categories**: Writing, Design, Code, Music, and Marketing
- **Response History**: Save and manage your AI-generated creative content
- **Modern UI/UX**: Responsive design with beautiful gradients and glass morphism effects
- **Production Ready**: Dockerized for easy deployment with Coolify
- **Rate Limiting**: Built-in protection against abuse
- **Database Storage**: PostgreSQL for persistent data storage

## 🏗️ Architecture

```
vibe-code/
├── client/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                  # Node.js TypeScript backend
│   ├── src/
│   │   ├── controllers/    # API route controllers
│   │   ├── routes/         # Express route definitions
│   │   ├── services/       # Business logic (Gemini AI)
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Express middleware
│   │   └── config/         # Configuration files
│   └── package.json
├── docker/                  # Docker configuration
│   └── nginx.conf          # Nginx reverse proxy config
├── Dockerfile              # Multi-stage build
└── docker-compose.yml      # Multi-container setup
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- Gemini API key from Google AI Studio

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vibe-code
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start PostgreSQL** (if not using Docker)
   ```bash
   # Make sure PostgreSQL is running on port 5432
   # Create database: createdb vibe_code
   ```

5. **Run development servers**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Health: http://localhost:3001/api/health

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Application: http://localhost
   - API: http://localhost/api

### Manual Docker Build

```bash
# Build the image
docker build -t vibe-code .

# Run the container
docker run -d \
  -p 3001:3001 \
  --env-file .env \
  --name vibe-code-app \
  vibe-code
```

## 🚀 Coolify Deployment

### Prerequisites for Coolify

- Coolify instance running
- PostgreSQL database service
- Gemini API key configured

### Step-by-Step Coolify Deployment

1. **Prepare your repository**
   ```bash
   # Commit your changes
   git add .
   git commit -m "Initial Vibe Code deployment"
   git push origin main
   ```

2. **Configure Coolify**
   - Log into your Coolify dashboard
   - Create a new project
   - Connect your GitHub repository
   - Configure the following:

3. **Environment Variables**
   Add these to your Coolify environment:
   ```env
   NODE_ENV=production
   PORT=3001
   GEMINI_API_KEY=your_gemini_api_key_here
   POSTGRES_DB=vibe_code
   POSTGRES_USER=your_db_user
   POSTGRES_PASSWORD=your_db_password
   DATABASE_URL=postgresql://user:password@host:5432/vibe_code
   CORS_ORIGIN=https://your-domain.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Build Configuration**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Port: `3001`

5. **Database Setup**
   - Create PostgreSQL database in Coolify
   - Run the database migration (automatic on startup)
   - Grant necessary permissions

6. **Domain Configuration**
   - Add your custom domain
   - Configure SSL certificates
   - Set up reverse proxy if needed

7. **Deploy**
   - Click "Deploy" in Coolify
   - Monitor deployment logs
   - Test the application

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `CORS_ORIGIN` | Frontend URL | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/ai/generate` | Generate AI response |
| `POST` | `/api/ai/save` | Save AI response |
| `GET` | `/api/ai/history` | Get response history |

## 🎨 Creative Categories

The application supports 5 creative categories:

1. **Writing** - Stories, poems, articles
2. **Design** - Visual concepts, UI/UX ideas
3. **Code** - Programming snippets, algorithms
4. **Music** - Melodies, compositions, arrangements
5. **Marketing** - Copywriting, social media content

## 🔒 Security Features

- Rate limiting on API endpoints
- Helmet.js security headers
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- Environment variable validation

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Glass morphism effects
- Gradient backgrounds
- Smooth animations
- Touch-friendly interface

## 🧪 Testing

```bash
# Run frontend tests
cd client && npm test

# Run backend tests  
cd server && npm test

# Run linting
npm run lint

# Type checking
npm run typecheck
```

## 📊 Monitoring

- Health check endpoint
- Application logs
- Database connection monitoring
- Rate limiting metrics
- Error tracking

## 🔄 CI/CD

The project includes:
- GitHub Actions workflows
- Automated testing
- Docker image building
- Deployment scripts
- Database migrations

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check PostgreSQL is running
   - Verify connection string
   - Check network connectivity

2. **Gemini API Errors**
   - Verify API key is valid
   - Check rate limits
   - Ensure billing is enabled

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

4. **Docker Issues**
   - Check Docker daemon is running
   - Verify port availability
   - Check disk space

### Logs

```bash
# View application logs
docker logs vibe-code-app

# View database logs
docker logs vibe-code-db

# View nginx logs
docker logs vibe-code-nginx
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the logs for error messages

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Advanced prompt templates
- [ ] Image generation integration
- [ ] Collaborative features
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] API documentation
- [ ] Webhook integrations

---

**Built with ❤️ for the creative community**