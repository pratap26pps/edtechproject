const express = require("express");
const routes = express.Router();



const { login,signupuser,sendotp,changepassword} = require("../controllers/auth");
 
const {auth} = require("../middleware/autharization");

routes.post("/login",login);

routes.post("/signup",signupuser);

routes.post("/sendotp",sendotp);
routes.post("/changepassword",changepassword);
 

routes.post("/auth ",auth);

module.exports = routes;