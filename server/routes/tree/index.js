const router = require("express").Router();
const treeHouseRoutes = require("./treeHouses")
const usersRoutes = require("./users")
// const feedbackRoutes = require('./feedback')
// const scrape = require ("./scrapper")

// /tree routes
router.use("/treeHouses", treeHouseRoutes)
router.use("/users", usersRoutes)
// router.use("/feedback", feedbackRoutes)


module.exports = router;
