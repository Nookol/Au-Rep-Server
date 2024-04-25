const express = require('express');
const ReportRouter = express.Router();
const {postCreateReport, getUserReportsByStatus, getLocations, getRooms, getLocationDetails} = require("../controllers/reportController");

ReportRouter.post("/createReport", postCreateReport);

ReportRouter.get("/getReports/:id/:status",getUserReportsByStatus);

ReportRouter.get("/getLocations",getLocations);

ReportRouter.get("/getLocationDetails/:bID/:rID",getLocationDetails);

ReportRouter.get("/getRooms/:buildingId",getRooms);

module.exports = ReportRouter;
