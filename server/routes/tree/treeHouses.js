// const router = require("express").Router();
const router = require('express').Router();
// const router = new express.Router();
const treeHousesController = require("../../controllers/treeHouseController");
const userController = require("../../controllers/usersController")

// Matches with "/tree/treeHouses"
router.route("/")
  // .get(treeHousesController.find)
  .post(treeHousesController.create);

// Matches with "/tree/treeHouses/:id"
router
  .route("/:id")
  .get(treeHousesController.findById)
  .put(treeHousesController.update)
  .delete(treeHousesController.remove);


module.exports = router;
