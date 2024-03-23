const client = require('../util/db')

class MyReportsModel {
    constructor(reportid, userid, image, location, title, description) {
        this.reportid = reportid;
        this.userid = userid;
        this.image = image;
        this.location = location;
        this.title = title;
        this.description = description;
    }
    // testGetNewReport = () => {
    //     const query = client.query (`
    //     INSERT INTO reports (image, location, title, description)
    //     VALUES ('coffee spill', 'Stephens 103', 'coffee spill in stephens', 'small coffee spill');
    //     `).then(results => console.log(results))
    // }

    showMyReports = async (userid, status) => {
        //userid = userid+'';



        const query = `select * from reports where userid=$1 AND status=$2`;
        try{
            const result = await client.query(query, [userid, status]);
            return result;

        }catch(err){
            console.log(err);
        }
        



    }

}

module.exports = MyReportsModel;
