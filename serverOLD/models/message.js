const { response } = require('express');
const client = require('../util/db');

class MessageModel{
    
    createNewMessage = async (userid, message, postedTime) => {
            const queryText = `
            INSERT INTO messages (userid, message, timeposted)
            VALUES ($1, $2,$3)`;
            try {
              const result = await client.query(queryText, [userid, message, postedTime]);
              console.log('Message inserted successfully');
              return result;
          } catch (err) {
              console.error('Error executing query:', err.stack);
              throw new Error('Error executing query');
          }
    }

  
    getMessages = async () =>{

        try {
            const query = "SELECT * FROM ( SELECT m.*, u.firstname, u.lastname FROM messages m JOIN users u ON m.userid = u.userid ORDER BY m.timestamp DESC LIMIT 50) AS reversed_messages ORDER BY timestamp ASC";
            const result = await client.query(query);
            return result.rows;

          } catch (error) {
            console.error('Error querying messages:', error.stack);
            throw error; // Re-throw the error to be caught by the caller
          }
    }

    getUserByEmail = async(userEmail) =>{
        try {
            const text = 'SELECT * FROM users WHERE email = $1';
            const value= [userEmail];
            const result = await client.query(text, value);
                  return result.rows;
          } catch (error) {
            // Handle errors
            console.error('Error querying messages:', error.stack);
            throw error;
          }
    }

    
}

module.exports = MessageModel;