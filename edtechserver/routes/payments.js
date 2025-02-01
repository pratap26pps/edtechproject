const express = require("express");
const routes = express.Router();

const {capturepayments,verifysignature,} = require("../controllers/payments");
const {auth,isinstructor,isstudent,isadmin} = require("../middleware/Autharisation")


routes.post("/capturepaments",capturepayments,auth,isstudent);  
routes.post("/verifysignature",verifysignature);


module.exports = routes;
