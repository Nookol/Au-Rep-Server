const express = require('express');
const ReportRouter = express.Router();
// const Report = require ("../models/report")
const client = require ('../util/db')
const report = require("../models/report");

ReportRouter.post("/postreport", (req, res) => {
    // Report.runGetReport();
    console.log(req.body.title);
    console.log(req.body.location);
    // const query = client.query (`
    //     INSERT INTO reports (image, location, title, description)
    //     VALUES (req.image, req.location, req.title, req.description);
    //     `).then(results => console.log(results))

    res.send(JSON.stringify({s : "BLAH"}))
});


ReportRouter.get("/getReports",  async (req, res) =>{
    console.log("It's getting into the router.")
    const userid = req.rawHeaders[3];
    const status = req.rawHeaders[5];

    const data = new report();
    const result = await data.showMyReports(userid, status);

    res.json(result.rows);
})

module.exports = ReportRouter;
