const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

// Set up view engine
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        active: { home: true },
        currentYear: new Date().getFullYear(),
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        active: { about: true },
        currentYear: new Date().getFullYear(),
        content: {
            content: 'About Me goes here'
        }
    });
});

app.get('/resume', (req, res) => {
    res.render('resume', {
        title: 'Resume',
        active: { resume: true },
        currentYear: new Date().getFullYear(),
        content: {
            content: 'resume content goes here'
        }
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Blog',
        active: { blog: true },
        currentYear: new Date().getFullYear(),
        content: {
            content: 'blog content goes here'
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 