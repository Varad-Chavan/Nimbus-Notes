const express = require("express");

//to create route to the endpoint
const router = express.Router(); 

//importing Schema
const User = require("../modules/User"); 

//package just for validating inputs like name,email etc
const { body, validationResult } = require("express-validator"); 

//package for hasing and salting
const bcrypt = require('bcryptjs');

//
const jwt = require('jsonwebtoken');

const JWT_SIGN = process.env.JWT_SIGN

//
const fetchuser = require('../middleware/fetchuser')

//ROUTE 1:  Create a User using POST  "/api/auth/createuser." Doesn't require Login
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ], //input formats
  async (req, res) => {
    //async function which first checks for error from above
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    //then tries to atleast one user with same email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Enter Valid Email Address" });
      }
      //
      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password,salt); 
      //if not found then creates a user (which might take time, thus used await)
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data ={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SIGN);


      res.json(authToken); //idk
    } catch (
      error //while trying if any error occured, so to address that
    ) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);



//ROUTE 2:  Create a Login using POST  "/api/auth/login." Doesn't require Login
router.post(
  "/login",
  [
    body("email","Enter Valid Email").isEmail(),
    body("password","Blank Email Doesn't work").exists(),
  ], //input formats
  async (req, res) => {
    let success = false
    //async function which first checks for error from above
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body
    try{
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ success,error: "Please try to login with corret information" });
      }
      const passcompare = await bcrypt.compare(password,user.password)
      if(!passcompare){
          return res.status(400).json({ success,error: "Please try to login with corret information" });
        }
      const data ={
        user:{
            id:user.id
          }
        }
      const authToken=jwt.sign(data,JWT_SIGN);
  
        success=true
      res.json({success,authToken}); //idk
    }
    catch (
      error //while trying if any error occured, so to address that
    ) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  })
//ROUTE 3:  Get logged in userdetails using POST  "/api/auth/getuser."  Login required
router.post(
  "/getuser",fetchuser, //input formats
  async (req, res) => {
try {
  userID = req.user.id
  const user = await User.findById(userID).select("-password")
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error Occured");
}})
module.exports = router;
