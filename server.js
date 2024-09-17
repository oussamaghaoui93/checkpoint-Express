const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the template engine 
app.set('view engine', 'ejs');

// Middleware to serve static files (CSS)
app.use(express.static('public'));

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const day = date.getDay(); // 0 is Sunday, 6 is Saturday
    const hour = date.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // During working hours
    } else {
        res.send('<h1>Sorry, the web application is only available during working hours (Mon-Fri, 9-17).</h1>');
    }
};

// Apply the middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
