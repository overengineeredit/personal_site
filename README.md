# Personal Website

A modern personal website built with Node.js, Express, and Mustache templates, designed with security and best practices in mind. The site includes sections for About Me, Resume, and Blog, with comprehensive testing and CI/CD pipeline.

## Features

- Responsive navigation bar
- About Me section integrated into home page
- Resume section with experience, education, and skills
- Blog section (ready for future content)
- Clean and modern design
- Comprehensive security features:
  - Helmet.js for security headers
  - CORS protection
  - Rate limiting
  - XSS protection
- Automated testing and CI/CD:
  - Jest test suite
  - ESLint code quality
  - GitHub Actions workflow
  - Docker container builds
  - GitHub Container Registry integration

## Project Structure

```
personal_site/
├── .github/               # GitHub configurations
│   └── workflows/        # GitHub Actions workflows
├── tests/                # Test files
│   └── server.test.js   # Server endpoint tests
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
├── Dockerfile           # Docker build configuration
├── .dockerignore        # Docker ignore rules
├── .eslintrc.json      # ESLint configuration
├── package.json         # Project dependencies
├── env.template         # Environment variables template
└── README.md           # Project documentation
```

## Prerequisites

- Node.js 22.x or Docker
- Git

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone [your-repository-url]
cd personal_site
```

2. Create environment file:
```bash
cp env.template .env
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

### Docker Deployment

1. Build and run with Docker:
```bash
docker build -t personal-site .
docker run -p 3000:3000 personal-site
```

Or using Docker Compose:
```bash
docker compose up -d
```

The site will be available at http://localhost:3000

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Start production server
npm start
```

## Docker Commands

### Basic Usage

```bash
# Build the image
docker build -t personal-site .

# Run the container
docker run -p 3000:3000 personal-site

# Pull from GitHub Container Registry
docker pull ghcr.io/[username]/personal-site:latest

# Run from GitHub Container Registry
docker run -p 3000:3000 ghcr.io/[username]/personal-site:latest
```

### Maintenance

```bash
# View logs
docker logs -f [container-name]

# Access container shell
docker exec -it [container-name] sh

# Check container health
docker inspect [container-name]
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. On push to main or pull request:
   - Runs linting checks
   - Executes test suite
   - Builds the application
   - Builds Docker image
   - Pushes to GitHub Container Registry

### Workflow Steps:
- Node.js setup and dependency installation
- Code linting with ESLint
- Test execution with Jest
- Docker image build and push
- Artifact upload for test coverage

## Security Features

- Helmet.js security headers:
  - Content Security Policy
  - CORS policies
  - XSS protection
  - HSTS
  - and more
- Rate limiting for API protection
- CORS configuration with allowlist
- Secure cookie settings
- Docker security best practices:
  - Non-root user
  - Multi-stage builds
  - Minimal base image

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

## Testing

The project includes a comprehensive test suite using Jest:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

Test coverage includes:
- API endpoint testing
- Error handling
- Security middleware
- Rate limiting functionality

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting
4. Submit a pull request

## License

This project is open source and available under the MIT License. 