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
app.post('/api/todo', (req, res) => {
    const newTask = req.body;
    // {
    //     text: 'string',
    // }
    newTask.complete = false;
    const queryText = `INSERT INTO "todo" ("task", "complete")
    VALUES ($1, $2);`;

    pool.query(queryText, [newTask.text, newTask.complete])
        .then((response) => {
            console.log(response);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error with POST: ', err);
            res.sendStatus(500);
        });

});

// CREATE TODO PUT
app.put('/api/todo/:id', (req, res) => {
    const taskUpdate = req.body;
    // {
    //     complete: Boolean,
    // }
    const taskId = req.params.id;
    const queryText = `UPDATE "todo" SET "complete"=$1 WHERE "id"=$2;`;

    pool.query(queryText, [taskUpdate.complete, taskId])
        .then((response) => {
            console.log(response);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error with PUT: ', err);
            res.sendStatus(500);
        });

});

app.listen(PORT, () => {
    console.log('Server running on ', PORT);
});