# Personal Website

A modern, secure, and analytics-enabled personal website built with Node.js, Express, and Mustache templates.

## Features

- 🚀 Fast and lightweight Express.js server
- 📊 Google Tag Manager integration for analytics
- 🔒 Comprehensive security with Helmet.js
- 🎨 Clean and responsive design
- 📱 Mobile-friendly layout
- 🔍 SEO optimized
- 🧪 Comprehensive testing suite
- 🐳 Docker support
- 📈 Rate limiting for API protection
- 🔄 CI/CD with GitHub Actions

## Project Structure

```
.
├── assets/                 # Static assets and data files
├── public/                 # Public static files
│   ├── css/               # Stylesheets
│   └── data/              # JSON data files
├── views/                 # Mustache templates
│   ├── partials/         # Reusable template parts
│   │   ├── footer.mustache
│   │   ├── google-tag-manager-body.mustache
│   │   ├── google-tag-manager-head.mustache
│   │   └── header.mustache
│   ├── 404.mustache      # Not found page
│   ├── blog.mustache     # Blog page template
│   ├── error.mustache    # Error page
│   ├── index.mustache    # Home page
│   └── resume.mustache   # Resume page
├── tests/                # Test files
├── scripts/             # Utility scripts
├── .github/             # GitHub configuration
│   └── workflows/       # GitHub Actions workflows
├── .eslintrc.json      # ESLint configuration
├── .dockerignore       # Docker ignore rules
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile         # Docker build configuration
├── env.template       # Environment variables template
├── package.json      # Node.js dependencies and scripts
└── server.js        # Main application file
```

## Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0
- Docker (optional, for containerization)

## Environment Variables

Copy `env.template` to `.env` and configure the following variables:

```bash
PORT=3000                    # Server port
SITE_NAME="Personal Site"    # Site name
FOOTER_NAME="Your Name"      # Footer name
NODE_ENV=development         # Environment (development/production)
GTM_ID=GTM-XXXXXX          # Google Tag Manager ID
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.template .env
# Edit .env with your configuration
```

## Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm test
```

## Linting

The project uses ESLint with Node.js recommended rules. Run linting:
```bash
npm run lint
```

Fix automatic linting issues:
```bash
npm run lint:fix
```

## Docker Deployment

1. Build the image:
```bash
docker build -t personal-site .
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

## CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- Runs on push to main and pull requests
- Performs linting and testing
- Builds and tests Docker image
- Validates Google Tag Manager implementation
- Checks accessibility and SEO
- Publishes Docker image to GitHub Container Registry

## Security Features

- Helmet.js for secure HTTP headers
- Content Security Policy (CSP) configuration
- Rate limiting
- CORS protection
- XSS prevention
- HSTS enabled
- Frame protection

## Analytics

The site uses Google Tag Manager for analytics:
- GTM container setup in head and body
- Configurable through environment variables
- CSP rules configured for GTM and GA4
- Privacy-focused implementation

## License

[Your License]

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 