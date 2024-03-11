const express = require("express");
const path = require("path");
const upload = require('./config/upload');
const app = express();
const routes = require("./routes");
const sessionOptions = require("./config/database");
const flash = require("connect-flash");
const csrf = require("csurf");
const {
  middlewareGlobal,
  csrfMiddleware,
  checkCsrfError,
} = require("./src/middlewares/middleware");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionOptions);
app.use(upload.single('image'))
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(csrf());
app.use(csrfMiddleware);
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  console.log("http://localhost:3000/");
});