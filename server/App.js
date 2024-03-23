const express = require("express");
const cors = require("cors");
const MessageRouter = require("./routes/message");
const ReportRouter = require("./routes/report");
const ResetRouter = require("./routes/passwordreset");
const UserModel = require("./models/user.js");
const app = express();
const port = process.env.PORT || 3000;
// const portNumber = require("./../Portnumber/portNumber.js");
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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "100mb"}));
app.use(express.json());
app.use(cors());

app.use("/messaging", MessageRouter);
app.use("/reporting", ReportRouter);
app.use(ReportRouter);
app.use(ResetRouter);

//Middleware to verify Firebase ID token
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


app.get("/test", (req, res)=>{
    res.send("BLAH!")
})


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

// Public route (does not require authentication)
app.get("/public", (req, res) => {
    res.send("This route is public and does not require authentication.");
});

// Private route (requires authentication)
app.get("/getReports", verifyToken, (req, res) => {
    console.log(req)
    res.send(`Welcome user ${req.user.email}, this route is protected.`);
});

io.on('connection', (socket) =>{
  socket.on("message", (msg) =>{
    console.log(msg);
    io.emit("data", msg);
  })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

