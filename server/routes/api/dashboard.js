// const express = require('express');

const router = require("express").Router();
//const userController = require("../controllers/usersController");
// const router = new express.Router();
// const charactersController = require("../../controllers/charactersController");

//Matches /api/dashboard
router.route('/')
  .get((req,res) => {
    res.status(200).json({
      message: "You're authorized to see this secret message.",
      // user values passed through from auth middleware
      user: req.user
    });
  
  } )
  
// router.get('/dashboard', (req, res) => {
//   res.status(200).json({
//     message: "You're authorized to see this secret message.",
//     // user values passed through from auth middleware
//     user: req.user
//   });
// });


module.exports = router;
