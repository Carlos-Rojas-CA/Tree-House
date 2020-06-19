// const router = require("express").Router();
const router = require('express').Router();
// const router = new express.Router();
const usersController = require("../../controllers/usersController");

// Matches with "/user"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/user/:id"
router
  .route("/user/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
