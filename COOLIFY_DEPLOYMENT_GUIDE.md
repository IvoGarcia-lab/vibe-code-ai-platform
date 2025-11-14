# Vibe Code AI Platform - Coolify Deployment Guide

## Overview
This guide will help you deploy the Vibe Code AI Platform on Coolify successfully.

## Prerequisites
- Coolify account with team-level GEMINI_API_KEY configured
- GitHub repository with the project code
- Domain name configured in Coolify

## Deployment Steps

### 1. Environment Variables Configuration

In Coolify, configure these environment variables at the team level:

**Required Variables:**
```
GEMINI_API_KEY=AIzaSyBC29i4OWdrfbZ4pZ0-xUtOYZxYLuUkdts
```

**Optional Variables (with defaults):**
```
POSTGRES_DB=vibe_code
POSTGRES_USER=vibe_user
POSTGRES_PASSWORD=vibe_password_2024
NODE_ENV=production
PORT=3001
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Docker Compose Configuration

Use the `docker-compose.coolify.yml` file for deployment:
- File path: `./docker-compose.coolify.yml`
- This configuration is optimized for Coolify deployment
- Includes PostgreSQL database and Node.js application
- No nginx service (uses Coolify's built-in reverse proxy)

### 3. Build Configuration

The Dockerfile uses multi-stage builds:
1. **Client Builder**: Builds the React frontend
2. **Server Builder**: Builds the Node.js backend
3. **Production**: Combines both with production dependencies only

### 4. Health Checks

Both services include health checks:
- **PostgreSQL**: Checks database connectivity
- **Application**: Checks API health endpoint at `/api/health`

### 5. Networking

Services communicate through the `vibe-code-network` bridge network.
Database is accessible at `postgres:5432` from the application container.

### 6. Volume Management

- **PostgreSQL Data**: Persistent storage for database
- **Application Logs**: Optional log volume for debugging

## Troubleshooting

### Common Issues:

1. **Build Failures**: Ensure NODE_ENV=development during build stages
2. **Environment Variables**: Verify GEMINI_API_KEY is set at team level
3. **Database Connection**: Check PostgreSQL health status
4. **Port Conflicts**: Ensure port 3001 is available

### Verification Steps:

1. Check service health in Coolify dashboard
2. Test API endpoint: `https://your-domain.com/api/health`
3. Test AI generation: `https://your-domain.com/api/ai/generate`
4. Verify frontend: `https://your-domain.com/`

## Post-Deployment

1. Update CORS_ORIGIN with your actual domain
2. Change default passwords for production
3. Configure SSL/TLS certificates
4. Set up monitoring and alerts
5. Review rate limiting settings

## Support

For issues, check:
- Coolify logs for build/deployment errors
- Application logs in `/app/logs` directory
- Database connectivity and health checks
- Environment variable configuration