const MyReportsModel = require('../models/report');
const reportModel = new MyReportsModel();
const postCreateReport = async (req, res) => {
    const { userId, image, title, location, locationSpec, description } = req.body;
    const reportModel = new MyReportsModel(userId, image, {building: location.label, room: locationSpec.label}, title, description, "Open");
    try {
        await reportModel.createReport();
        console.log("New Report Created");
        res.status(200).json({ message: "Report created successfully" });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ error: "Internal serverOLD error" });
    }
};

const getUserReportsByStatus = async (req, res) =>{
    console.log(req.params)
    const id = req.params.id;
    const status = req.params.status;

    const results = await reportModel.showMyReports(id,status)
    res.send(results)
}

module.exports = {postCreateReport, getUserReportsByStatus};