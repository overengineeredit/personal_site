# Personal Website

A simple personal website built with Node.js, Express, and Mustache templates. The site includes sections for About Me, Resume, and Blog.

## Features

- Responsive navigation bar
- About Me section
- Resume section with experience, education, and skills
- Blog section (ready for future content)
- Clean and simple design
- Easy to customize and extend

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

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd personal_site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at http://localhost:3000

## Development

- `npm run dev` - Starts the development server with auto-reload
- `npm start` - Starts the production server

## Customization

1. Edit the content in the respective .mustache files in the `views` directory
2. Add your personal information in the resume and about sections
3. Add your blog posts in the blog section
4. Customize the styling by adding CSS files in the `public` directory

## License

This project is open source and available under the MIT License. 