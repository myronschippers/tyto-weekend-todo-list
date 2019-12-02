const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// CREATE TODO GET
app.get('/api/todo', (req, res) => {
    const queryText = `SELECT * FROM "todo" ORDER BY "id" ASC;`

    pool.query(queryText)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log('Error with GET: ', err);
            res.sendStatus(500);
        });
});

// CREATE TODO POST
app.post('/api/todo', (req, res) => {});

// CREATE TODO PUT
app.put('/api/todo', (req, res) => {});

app.listen(PORT, () => {
    console.log('Server running on ', PORT);
});