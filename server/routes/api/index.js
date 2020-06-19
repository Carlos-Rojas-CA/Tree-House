const router = require("express").Router();
const dashboardRoutes = require("./dashboard");
const userRoutes = require("./user")

// Dashboard routes
router.use("/dashboard", dashboardRoutes);
router.use("/user", userRoutes)
// router.use("/characters", characterRoutes)

module.exports = router;
