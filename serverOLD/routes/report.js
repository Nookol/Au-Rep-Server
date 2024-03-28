const express = require('express');
const ReportRouter = express.Router();
const {postCreateReport, getUserReportsByStatus} = require("../controllers/reportController");

ReportRouter.post("/createReport", postCreateReport);

ReportRouter.get("/getReports/:id/:status",getUserReportsByStatus);

module.exports = ReportRouter;
