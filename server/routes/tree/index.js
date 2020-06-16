const router = require("express").Router();
const characterRoutes = require("./characters")
const feedbackRoutes = require('./feedback')
// const scrape = require ("./scrapper")

// /tree routes
// router.use("/dashboard", dashboardRoutes);
router.use("/characters", characterRoutes)
router.use("/feedback", feedbackRoutes)
// router.use("/scrapper", scrape)

module.exports = router;
