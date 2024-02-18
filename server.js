const path = require('path');
const express = require("express");
const app = express();
const routes = require('./routes');
const sessionOptions = require("./config/database");
const flash = require("connect-flash");

app.use(express.urlencoded({extended: true}));
app.use(routes)
app.use(express.static(path.resolve(__dirname, "public")));
app.use(sessionOptions);
app.use(flash())

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.listen(3000 , () => {
    console.log('Server init in:');
    console.log('http://localhost:3000');
})