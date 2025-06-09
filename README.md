# Personal Website

A simple personal website built with Node.js, Express, and Mustache templates. The site includes sections for About Me, Resume, and Blog.

## Features

- Responsive navigation bar
- About Me section integrated into home page
- Resume section with experience, education, and skills
- Blog section (ready for future content)
- Clean and modern design
- Security features (CORS, rate limiting, security headers)
- Docker support for easy deployment

## Project Structure

```
personal_site/
├── public/           # Static files (CSS, images, etc.)
├── views/           # Mustache templates
│   ├── layout.mustache    # Main layout template
│   ├── index.mustache     # Home page
│   ├── about.mustache     # About page
│   ├── resume.mustache    # Resume page
│   ├── blog.mustache      # Blog page
│   └── content.mustache   # Content partial
├── server.js        # Express server setup
├── package.json     # Project dependencies
└── README.md        # This file
```

## Prerequisites

- Node.js (v14 or higher) for local development
- npm (Node Package Manager)
- Docker and Docker Compose (for containerized deployment)

## Local Development

1. Clone the repository:
```bash
git clone [your-repository-url]
cd personal_site
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the template:
```bash
cp env.template .env
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at http://localhost:3000

## Docker Deployment

### Using Docker Compose (Recommended)

1. Build and start the container:
```bash
docker-compose up -d
```

2. View logs:
```bash
docker-compose logs -f
```

3. Stop the container:
```bash
docker-compose down
```

### Using Docker Directly

1. Build the image:
```bash
docker build -t personal-site .
```

2. Run the container:
```bash
docker run -d -p 3000:3000 --env-file .env --name personal-site personal-site
```

3. Stop the container:
```bash
docker stop personal-site
```

## Development

- `npm run dev` - Starts the development server with auto-reload
- `npm start` - Starts the production server

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

## License

This project is open source and available under the MIT License. 