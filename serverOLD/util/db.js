const pg = require('pg')
// const path = require("path");
const { Client } = pg;
// require('dotenv').config({path:__dirname+'/.././.env'})

DATABASE_URL="postgresql://user:hXHzYPyOzHtMfde99gZOoQ@au-report-14082.5xj.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full";

const client = new Client({
    connectionString: DATABASE_URL,
});

module.exports = client;

client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });




