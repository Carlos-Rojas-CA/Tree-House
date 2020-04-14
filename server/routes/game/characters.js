// const router = require("express").Router();
const router = require('express').Router();
// const router = new express.Router();
const charactersController = require("../../controllers/charactersController");

// Matches with "/game/characters"
router.route("/")
  .get(charactersController.find)
  .post(charactersController.create);

// Matches with "/game/characters/:id"
router
  .route("/:id")
  .get(charactersController.find)
  .put(charactersController.update)
  .delete(charactersController.remove);

module.exports = router;
