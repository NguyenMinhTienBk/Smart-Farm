const express = require("express");
const router = express.Router();
const { createUser, userSignIn, getUser } = require("../controller/user");
const {
  createTreeSystem,
  getTreeSystemByEmail,
  updateTreeSystemByEmail,
} = require("../controller/automatic");

router.post("/create-user", createUser);
router.post("/sign-in", userSignIn);
router.get("/get-user/:email", getUser);

router.get("/get-tree-system/:email", getTreeSystemByEmail);
router.post("/create-tree-system", createTreeSystem);
router.put("/update-tree-system/:email", updateTreeSystemByEmail);

router.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend zone!" });
});

module.exports = router;
