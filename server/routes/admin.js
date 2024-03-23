const express = require('express');
const AdminRouter = express.Router();

AdminRouter.get("/d", (req, res) =>
{
    res.send(JSON.stringify({s : "BLAH"}))
});

module.exports = AdminRouter