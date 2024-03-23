const express = require('express');
const UserRouter = express.Router();

UserRouter.get("d", () => {
    console.log("blah")
});


module.exports = UserRouter