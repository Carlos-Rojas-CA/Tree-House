const router = require("express").Router();
const characterRoutes = require("./characters")
const feedbackRoutes = require('./feedback')

// Dashboard routes
// router.use("/dashboard", dashboardRoutes);
router.use("/characters", characterRoutes)
router.use("/feedback", feedbackRoutes)

module.exports = router;
