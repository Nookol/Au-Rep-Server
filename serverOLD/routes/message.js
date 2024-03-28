const express = require('express');
const messageRouter = express.Router();
const messageModel = require('./../models/message');
const data = new messageModel();

messageRouter.post("/postMessages", async (req, res) => {
    console.log("This is the body: ")
    console.log(req.body);
    await data.createNewMessage(req.body.userid, req.body.message, req.body.postedTime);
    res.json("message posted!");
});

messageRouter.get("/getMessages", async (req,res) => {
    const allMessages = await data.getMessages();
    // console.log(allMessages)
    res.send(allMessages);
});

// messageRouter.get("/getUserByEmail", async (req,res) => {
//     const data = new messageModel();
//     email = req.rawHeaders[3];
//     const allMessages = await data.getUserByEmail(email);
//     res.send(allMessages);
// });

module.exports = messageRouter