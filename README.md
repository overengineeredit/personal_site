# Personal Website

A modern personal website built with Node.js, Express, and Mustache templates, designed to run in Docker. The site includes sections for About Me, Resume, and Blog.

## Features

- Responsive navigation bar
- About Me section integrated into home page
- Resume section with experience, education, and skills
- Blog section (ready for future content)
- Clean and modern design
- Security features (CORS, rate limiting, security headers)
- Containerized with Docker for easy deployment

## Project Structure

```
personal_site/
├── docker/                # Docker configuration
│   ├── Dockerfile        # Docker build instructions
│   └── .dockerignore    # Files to exclude from Docker build
├── public/               # Static files
│   ├── css/             # Stylesheets
│   │   └── style.css    # Main stylesheet
│   └── images/          # Image assets
├── views/                # Mustache templates
│   ├── partials/        # Reusable template parts
│   │   ├── header.mustache
│   │   └── footer.mustache
│   ├── index.mustache   # Home page with About section
│   ├── resume.mustache  # Resume page
│   ├── blog.mustache    # Blog page
│   ├── 404.mustache    # Not found page
│   └── error.mustache   # Error page
├── server.js            # Express server setup
├── docker-compose.yml   # Docker compose configuration
├── package.json         # Project dependencies
├── env.template         # Environment variables template
└── README.md           # Project documentation
```

## Prerequisites

- Docker Desktop
- Git

## Quick Start

1. Clone the repository:
```bash
git clone [your-repository-url]
cd personal_site
```

2. Create environment file:
```bash
cp env.template .env
```

3. Build and start the container:
```bash
docker compose up -d
```

The site will be available at http://localhost:3000

## Docker Commands

### Basic Usage

```bash
# Start the application
docker compose up -d

# View logs
docker compose logs -f

# Stop the application
docker compose down

# Rebuild after code changes
docker compose up -d --build
```

### Maintenance

```bash
# Check container status
docker ps

# View resource usage
docker stats

# Access container shell
docker compose exec web sh

# View container logs with timestamps
docker compose logs -f --timestamps
```

### Troubleshooting

```bash
# Restart the container
docker compose restart

# Force rebuild without cache
docker compose build --no-cache

# Check container health
docker inspect personal_site-web-1 | grep Health
```

## Customization

1. Edit the content in the respective .mustache files in the `views` directory
2. Add your personal information in the resume and about sections
3. Add your blog posts in the blog section
4. Customize the styling by modifying `public/css/style.css`
5. Update environment variables in `.env` file

## Security Features

- CORS protection
- Rate limiting
- Security headers (Helmet.js)
- XSS protection
- CSRF protection
- Non-root Docker user
- Container health checks
- Resource limits and logging

## Environment Variables

Key environment variables in `.env`:

```bash
# Application Environment
NODE_ENV=production

# Server Configuration
PORT=3000

# Site Configuration
SITE_OWNER_NAME=Your Name
SITE_TITLE=Your Site Title
SITE_DESCRIPTION=Your site description
SITE_URL=https://yoursite.com

# Security Configuration
ALLOWED_ORIGINS=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## License

This project is open source and available under the MIT License. 