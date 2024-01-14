const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Set the port number you want to use

// INDEX.HTML
app.get('/:file', (req, res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `views/${file}`));
})
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, `views/index.html`));
})

app.get('/javascripts/layouts/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/javascripts/layouts/${file}`))
})

app.get('/javascripts/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/javascripts/${file}`))
})

app.get('/javascripts/archive/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/javascripts/archive/${file}`))
})

app.get('/stylesheets/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/stylesheets/${file}`))
})

app.get('/stylesheets/archive/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/stylesheets/archive/${file}`))
})

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});