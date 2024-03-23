const express = require('express');
const messageRouter = express.Router();
const messageModel = require('./../models/message');
const data = new messageModel();


messageRouter.post("/postMessages", (req,res) => {
    console.log("This is the body: ")
    console.log(req.body);
    data.createNewMessage(req.body.userid, req.body.message, req.body.postedTime);  
    res.json("message posted!");
});

messageRouter.get("/getMessages", async (req,res) => {
    const data = new messageModel();
    const allMessages = await data.getMessages();
    res.send(allMessages);
});
messageRouter.get("/getUserByEmail", async (req,res) => {
    const data = new messageModel();
    email = req.rawHeaders[3];
    const allMessages = await data.getUserByEmail(email);
    res.send(allMessages);
});

module.exports = messageRouter