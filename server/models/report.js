const client = require('../util/db')

class MyReportsModel {
    constructor(userid, image, location, title, description, status) {
        this.userid = userid;
        this.image = image;
        this.location = location;
        this.title = title;
        this.description = description;
        this.description = description;
        this.status = status;
    }

    createReport = async () => {
        this.status = 'open';
        const query = `
        INSERT INTO reports (userid, image, location, title, description, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
        try {
            const result = await client.query(query, [this.userid, this.image, this.location, this.title, this.description, this.status]);
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    // showMyReports = async (userid, status) => {
    //     const query = `select * from reports where userid=$1 AND status=$2`;
    //     try{
    //         const result = await client.query(query, [userid, status]);
    //         return result.rows;
    //
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    showMyReports = async (userid, status) => {
        const query = `
        SELECT reports.*, array_agg(details.description) AS notes
        FROM reports
        LEFT JOIN details ON reports.reportid = details.reportid
        WHERE reports.userid = $1 AND reports.status = $2
        GROUP BY reports.reportid
    `;
        try {
            const result = await client.query(query, [userid, status]);
            return result.rows;
        } catch (err) {
            console.log(err);
        }
    }


    getBuildingAndRoom = async (bID,rID) => {
        const buildingQuery = `SELECT buildingname FROM buildings WHERE buildingid = $1`;
        const roomQuery = `SELECT roomname FROM rooms WHERE roomid = $1`;

        try {
            const buildingResult = await client.query(buildingQuery, [bID]);
            const buildingName = buildingResult.rows[0].buildingname;
            const roomResult = await client.query(roomQuery, [rID]);
            const roomName = roomResult.rows[0].roomname;

            return { building: buildingName, room: roomName };
        } catch (error) {
            console.error('Error fetching building and room data:', error);
            return null;
        }
    };



    getLocations = async () => {
        const query = `select * from buildings`;
        try{
            const result = await client.query(query);
            return result.rows;

        }catch(err){
            console.log(err);
        }

    }

    getRooms = async (buildingId) => {
        console.log(buildingId)
        const query = `SELECT * FROM rooms WHERE buildingId = $1`;
        try {
            const result = await client.query(query, [buildingId]);
            return result.rows;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = MyReportsModel;
