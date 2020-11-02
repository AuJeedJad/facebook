const { Router } = require("express");
const express = require("express");
const passport = require("passport");
const db = require("./models");
require("./config/passport");

const userRouter = require("./routes/user");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);


app.listen("6500", () => {
    console.log("Server start at port 6500");
})

db.sequelize.sync({force: false})
    .then(() => {
        console.log("Database Connected");
    })
    .catch(() => {
        console.log("Error");
    })