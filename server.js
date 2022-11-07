const express = require("express");
const { notFound, errorHandler } = require ('./middleware/errorMiddleware')
const connectDB = require("./config/db"); //added config
const cors = require("cors"); //added cors
const app = express(); //express server

const bodyParser = require('body-parser')

require ('dotenv').config()


app.use(bodyParser.json());

const treatments= require ('./routes/treatment')
const user = require('./routes/user')


//cors added
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}));

// connect database

connectDB(); //added

app.use("/api/users", user)
app.use("/api/treatments", treatments)

app.use(notFound)
app.use(errorHandler)



app.use(cors({
    origin: true,
    credentials: true
}));

// initialize middleware
app.use(express.json({
    extended: false
}));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes



app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); 




//app.use(errorHandler);



// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is listening on 8000 `);
})

module.exports = app