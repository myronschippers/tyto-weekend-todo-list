const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// CREATE TODO GET
app.get('/api/todo', (req, res) => {});

// CREATE TODO POST
app.post('/api/todo', (req, res) => {});

// CREATE TODO PUT
app.put('/api/todo', (req, res) => {});

app.listen(PORT, () => {
    console.log('Server running on ', PORT);
});