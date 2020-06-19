const router = require("express").Router();
const treeHouseRoutes = require("./treeHouses")
// const feedbackRoutes = require('./feedback')
// const scrape = require ("./scrapper")

// /tree routes
router.use("/treeHouses", treeHouseRoutes)
// router.use("/feedback", feedbackRoutes)


module.exports = router;
