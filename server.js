const express = require("express");
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({extended: true}));
app.use(routes)
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.listen(3000 , () => {
    console.log('Server init in:');
    console.log('http://localhost:3000');
})