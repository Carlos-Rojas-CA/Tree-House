// const router = require("express").Router();
const router = require('express').Router();
// const router = new express.Router();
const feedbackController = require("../../controllers/feedbackController");

// Matches with "/game/feedback"
router.route("/")
  .get(feedbackController.findAll)
  .post(feedbackController.create);

// Matches with "/game/feedback/:id"
router
  .route("/:id")
//   .get(feedbackController.find)
  .put(feedbackController.update)
  .delete(feedbackController.remove);

module.exports = router;
