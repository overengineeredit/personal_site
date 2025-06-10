require('dotenv').config();
const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Site configuration
const siteConfig = {
  name: process.env.SITE_OWNER_NAME || 'Some dude who overengineers everything',
  title: process.env.SITE_TITLE || 'An overengineered personal website',
  description: process.env.SITE_DESCRIPTION || 'A personal website that is over-engineered and probably not needed',
  url: process.env.SITE_URL || 'https://overengineeredit.wtf',
  image: process.env.SITE_IMAGE || '/images/og-image.png',
  ga4Id: process.env.GA4_ID || null
};

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'', '\'unsafe-inline\'', 'https://fonts.googleapis.com'],
      scriptSrc: ['\'self\'', 'https://www.googletagmanager.com', '\'unsafe-inline\''],
      imgSrc: ['\'self\'', 'data:', 'https:', 'https://www.googletagmanager.com'],
      connectSrc: ['\'self\'', 'https://www.google-analytics.com'],
      fontSrc: ['\'self\'', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
      objectSrc: ['\'none\''],
      mediaSrc: ['\'self\''],
      frameSrc: ['\'none\''],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'same-site' },
  dnsPrefetchControl: true,
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'],
  optionsSuccessStatus: 204,
  credentials: true
}));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Serve static files with cache control
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Common data middleware for all routes
app.use((req, res, next) => {
  res.locals = {
    ...res.locals,
    currentYear: new Date().getFullYear(),
    site: siteConfig
  };
  next();
});

// Load resume data
const resumeData = require('./public/data/resume.json');

// Load about data
const aboutData = require('./public/data/about.json');

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    active: { home: true },
    content: aboutData.about_me
  });
});

app.get('/resume', (req, res) => {
  try {
    console.log('Resume data:', resumeData);
    res.render('resume', {
      title: 'Resume',
      active: { resume: true },
      resume: resumeData
    });
  } catch (error) {
    console.error('Error rendering resume:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to render resume page'
    });
  }
});

app.get('/blog', (req, res) => {
  res.render('blog', {
    title: 'Blog',
    active: { blog: true },
    content: {
      content: 'blog content goes here'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('error', {
    title: 'Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app; 