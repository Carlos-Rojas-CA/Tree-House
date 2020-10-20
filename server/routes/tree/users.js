const router = require('express').Router();
const userController = require("../../controllers/usersController");

// Matches with "/tree/users"
// router.route("/club/")
  // .get(userController.find)
  // .post(userController.create);

// Matches with "/tree/users/:id"
router
  .route("/:id")
  .get(userController.findByIdTreeHouse)
  .put(userController.updateTreeHouse)
  .delete(userController.removeTreeHouse);

// router
//   .route("/all/:id")
//   .get(userController.find)

// router
//   .route("/delete/:id")
//   .put(userController.remove)


module.exports = router;
