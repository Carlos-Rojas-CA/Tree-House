// const router = require("express").Router();
const router = require('express').Router();
// const router = new express.Router();
const charactersController = require("../../controllers/charactersController");

// Matches with "/characters"
router.route("/")
  .get(charactersController.findAll)
  .post(charactersController.create);

// Matches with "/api/characters/:id"
router
  .route("/:id")
  .get(charactersController.findById)
  .put(charactersController.update)
  .delete(charactersController.remove);

module.exports = router;
