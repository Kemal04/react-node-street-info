//Express 
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const cors = require("cors");
const sequelize = require('./data/db');

app.use(express.json());
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
app.use('/', express.static('public'))

const AuthRouter = require("./routes/auth.router")
const ContactRouter = require("./routes/contact.router")
const StreetRouter = require("./routes/street.router")
const BuildingRouter = require("./routes/building.router")
const BlogRouter = require("./routes/blog.router")
const ArtistRouter = require("./routes/artist.router")
const IndividRouter = require("./routes/individ.router")
const StaffRouter = require("./routes/staff.router")


app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/street", StreetRouter);
app.use("/api/v1/building", BuildingRouter);
app.use("/api/v1/blog", BlogRouter);
app.use("/api/v1/artist", ArtistRouter);
app.use("/api/v1/individ", IndividRouter);
app.use("/api/v1/staff", StaffRouter);


//serv
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})