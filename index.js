const express = require("express");
const bodyparser = require("body-parser");
const x_xss = require("x-xss-protection");
require("dotenv").config();
const mongoose = require("mongoose");
const {exit} = require("process");

const Point = require("./point");
const { UV_FS_O_FILEMAP } = require("constants");

const urlString = process.env.CON_STRING;
mongoose.connect(urlString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("connected to db"))
    .catch((e) => {console.log("Error connecting to db\n" + e); exit(1);})

const app = express();
app.use(x_xss());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use("/", express.static("view"));

app.post("/point/", (req, res) => {
    console.log(req.body)

    let point = req.body;
    Point.update({user:point.user}, point, {upsert:true}, (err, res) => {
        if(err) {
            console.log(err);
            res.status(500);
            res.send("Internal server errror");
            return;
        }
    }
    );

    res.status(200)
    res.send("yes")
});


app.get("/point/", async (req, res) => { // todo error handling
    let raw = await Point.find({});
    let filtered = [];
    for(val of raw) {
        filtered.push({x : val.x,y : val.y, user : val.user});
    }
    res.json(filtered);
});


let port = process.env.port || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));