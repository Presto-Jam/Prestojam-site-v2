// ---- CREDITS ----
// thx to DecodedFinn for this code :D
// I modified the code for loading HTML to load all HTML files instead of only index.html

const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Set the port number you want to use

// HTML files
app.get('/views/:file', (req, res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `views/${file}`));
});
app.get('/views/archive/:file', (req, res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `views/archive/${file}`));
});

// JS files
app.get('/javascripts/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/javascripts/${file}`))
})
app.get('/javascripts/archive/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/javascripts/${file}`))
})

// CSS files
app.get('/stylesheets/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/stylesheets/${file}`))
})
app.get('/stylesheets/archive/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/stylesheets/${file}`))
})


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});