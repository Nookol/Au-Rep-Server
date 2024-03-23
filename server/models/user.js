const client = require("../util/db");

class UserModel {
  constructor(email, firstName, lastName, phone, token) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.token = token;
  }

  registerNewUser = async () => {
    const query = {
      text: `
            INSERT INTO users (email, firstname, lastname, phone, token)
            VALUES ($1, $2, $3, $4, $5)
            `,
      values: [
        this.email,
        this.firstName,
        this.lastName,
        this.phone,
        this.token,
      ],
    };
    client
      .query(query)
      .then((results) => console.log(results))
      .catch((error) => console.error("Error inserting new user:", error));
  };
}

module.exports = UserModel;
