const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Set the port number you want to use

// Define a route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/javascripts/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/javascripts/${file}`))
})

app.get('/stylesheets/:file', (req,res) => {
    var file = req.params["file"]
    res.sendFile(path.join(__dirname, `src/stylesheets/${file}`))
})

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});