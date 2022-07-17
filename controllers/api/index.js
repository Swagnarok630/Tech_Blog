const router = require("express").Router();

const apiRoutes = require("./apiRoutes");
const userRoutes = require("./userRoutes");

router.use("/tech", apiRoutes);
router.use("/user", userRoutes);

module.exports = router;