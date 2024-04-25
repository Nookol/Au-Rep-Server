const MyReportsModel = require('../models/report');
const reportModel = new MyReportsModel();

const postCreateReport = async (req, res) => {
    console.log(req.body)
    const { userId, image, title, location, locationSpec, description } = req.body;
    const reportModel = new MyReportsModel(userId, image, [location, locationSpec], title, description, "Open");
    try {
        await reportModel.createReport();
        console.log("New Report Created");
        res.status(200).json({ message: "Report created successfully" });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUserReportsByStatus = async (req, res) =>{
    // console.log(req.params)
    const id = req.params.id;
    const status = req.params.status;

    const results = await reportModel.showMyReports(id,status)
    res.send(results)
}

const getLocations = async (req, res) =>{
    console.log("BLAH!")
    const results = await reportModel.getLocations();
    console.log(results)
    res.send(results)
}

const getLocationDetails = async (req, res) =>{
    const rID =req.params.rID
    const bID =req.params.bID
    const results = await reportModel.getBuildingAndRoom(bID,rID)
    console.log(results)
    res.send(results)
}

const getRooms = async (req, res) =>{
    const building = req.params.buildingId;
    console.log(building)
    const results = await reportModel.getRooms(building);
    console.log(results)
    res.send(results)
}
module.exports = { getLocationDetails, postCreateReport, getUserReportsByStatus, getLocations, getRooms};