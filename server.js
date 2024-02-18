const path = require("path");
const express = require("express");
const app = express();
const routes = require("./routes");
const sessionOptions = require("./config/database");
const flash = require("connect-flash");
const {
  middlewareGlobal,
  csrfMiddleware,
  checkCsrfError,
} = require("./src/middlewares/middleware");
const csrf = require("csurf");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(sessionOptions);
app.use(flash());

app.use(csrf());//Sempre usar antes do middleware.
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Server init in:");
  console.log("http://localhost:3000");
});
