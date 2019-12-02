const pg = require('pg');

let config = {};

if (process.env.DATABASE_URL) {
    config = {}
} else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'weekend9-to-do-app',
        max: 10,
        idleTimeoutMillis: 30000,
    }
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('Pool is connected!');
});

pool.on('error', () => {
    console.log('Error in Pool, get cleaner.');
});

module.exports = pool;
