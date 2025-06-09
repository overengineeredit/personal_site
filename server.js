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
    name: process.env.SITE_OWNER_NAME || 'Peenaki',
    title: process.env.SITE_TITLE || 'My Personal Site',
    description: process.env.SITE_DESCRIPTION || 'Personal website with about, resume, and blog sections',
    url: process.env.SITE_URL || 'https://overengineeredit.wtf',
    image: process.env.SITE_IMAGE || '/images/og-image.jpg'
};

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https:"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-site" },
    dnsPrefetchControl: true,
    frameguard: { action: "deny" },
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
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
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET'],
    optionsSuccessStatus: 200,
    credentials: true
}));

// Security headers middleware
app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

// Set view engine and views directory
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

// Routes
const renderPage = (template, title, active) => (req, res) => {
    res.render(template, {
        title,
        active: { [active]: true },
        currentYear: res.locals.currentYear
    });
};

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        active: { home: true },
        content: {
            about: {
                background: 'Add your background information here.',
                interests: 'Add your interests and hobbies here.'
            }
        }
    });
});

app.get('/resume', (req, res) => {
    res.render('resume', {
        title: 'Resume',
        active: { resume: true },
        currentYear: res.locals.currentYear,
        content: {
            content: 'resume content goes here'
        }
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Blog',
        active: { blog: true },
        currentYear: res.locals.currentYear,
        content: {
            content: 'blog content goes here'
        }
    });
});

// 404 handler - must come after all other routes
app.use((req, res) => {
    try {
        res.status(404).render('404', {
            title: '404 - Page Not Found',
            currentYear: res.locals.currentYear
        });
    } catch (err) {
        // If template rendering fails, send plain text
        res.status(404).send('404 - Page Not Found');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    try {
        res.status(err.status || 500).render('error', {
            title: 'Error',
            message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
        });
    } catch (renderErr) {
        res.status(err.status || 500).send('Internal Server Error');
    }
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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 