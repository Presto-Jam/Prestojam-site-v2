const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 80;

app.use(serveStatic(path.join(__dirname, 'views')));

// Load all HTML files in the 'public' directory
const htmlFiles = fs.readdirSync('views').filter(file => path.extname(file) === '.html');
htmlFiles.forEach(file => {
    const route = '/' + path.basename(file, '.html');
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, 'views', file));
    });
});

// Listen & host to specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// load html styling and functionality
app.use(express.static('public'));
app.use(express.static('public/javascripts'));
app.use(express.static('public/stylesheets'));