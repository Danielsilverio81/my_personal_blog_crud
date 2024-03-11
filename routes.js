const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const postController = require("./src/controllers/postController");
const express = require("express");

const route = express.Router();

route.get("/", homeController.index);
route.get("/search", postController.search);

route.get("/register", loginController.register);
route.get("/login", loginController.index);
route.get("/login/page", loginController.index);
route.get("/login/logout", loginController.processLogout);
route.post("/login/register", loginController.processRegister);
route.post("/login/sign", loginController.processLogin);

route.get("/create/article", postController.page);
route.get("/update/post/:id", postController.update);
route.get("/show/:id", postController.show);
route.post("/create/post", postController.create);
route.put("/posts/:id/:action", postController.handleActionLike);
route.put("/edit/:id", postController.edit);
route.delete("/delete/:id", postController.deletePost);


module.exports = route;
