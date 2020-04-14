const router = require("express").Router();
const dashboardRoutes = require("./dashboard");
// const characterRoutes = require("./character")

// Dashboard routes
router.use("/dashboard", dashboardRoutes);
// router.use("/characters", characterRoutes)

module.exports = router;
