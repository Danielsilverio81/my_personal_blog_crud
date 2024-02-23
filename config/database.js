require("dotenv").config();

const sevenDays = 1000 * 60 * 60 * 24 * 7

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("connect mongoose");
  })
  .catch((erro) => console.log(erro));

const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionOptions = session({
    secret: '37125967silveriosecret',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: sevenDays,
        httpOnly: true
    }
})

module.exports = sessionOptions