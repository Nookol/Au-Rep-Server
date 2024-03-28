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


    showMyReports = async (userid, status) => {
        const query = `select * from reports where userid=$1 AND status=$2`;
        try{
            const result = await client.query(query, [userid, status]);
            return result.rows;

        }catch(err){
            console.log(err);
        }

    }

}

module.exports = MyReportsModel;
