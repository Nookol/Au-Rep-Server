const express = require("express");
const cors = require("cors");
const MessageRouter = require("./routes/message");
const ReportRouter = require("./routes/report");
const ResetRouter = require("./routes/passwordreset");
const UserModel = require("./models/user.js");
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
const serviceAccount = require("./au-report-bbe7d-firebase-adminsdk-rm0f2-5424c5388d.json");
const db = require('./util/db.js')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "100mb"}));
app.use(express.json());
app.use(cors());

app.use("/messaging", MessageRouter);
app.use(ReportRouter);
app.use(ResetRouter);

const verifyToken = (req, res, next) => {
    const idToken = req.headers.authorization;
    userData = req.user;
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken; // Adding decoded user information to the request object
            next();
        })
        .catch((error) => {
            console.error("Error while verifying Firebase ID token:", error);
            res.status(403).send("Unauthorized");
        });

};

app.post("/register", async (req, res) => {
    const email = req.body.email;
    const first = req.body.fName;
    const last = req.body.lName;
    const phone = req.body.phone;
    const token = req.body.token;
    const user = new UserModel(email, first, last, phone, token);

    try {
        await user.registerNewUser();
        console.log("New User Created!");
        res.sendStatus(200);
    } catch (error) {
        console.error("Error registering user:", error);
        res.sendStatus(400);
    }
});

io.on('connection', (socket) => {
    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("data", msg);
    })
})

app.post('/getUserInfo', async (req, res) => {
    const email = req.body.email;
    const query = `SELECT firstname, lastname, userId FROM users WHERE email = $1`;
    try {
        const result = await db.query(query, [email]);
        if (result.rows.length > 0) {
            console.log("Success:", result.rows[0]);
            res.status(200).json(result.rows[0]); // Return user information
        } else {
            console.log("User not found for email:", email);
            res.status(404).send("User not found"); // Respond with 404 if user not found
        }
    } catch (error) {
        console.error("Error executing query:", error.message);
        res.status(500).send("Error retrieving user information"); // Respond with 500 if any error occurs
    }
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

