const express = require("express");
const router = express.Router();
const {
  createUser,
  userSignIn,
  getUser,
  updateUser,
} = require("../controller/user");
const {
  createTreeSystem,
  getTreeSystemByEmail,
  updateTreeSystemByEmail,
} = require("../controller/automatic");

const {
  createValueManual,
  getValueManualByEmail,
  deleteTask,
} = require("../controller/manual");

const { createNotify, getNotify } = require("../controller/notify");
const { createDevice, getDevice } = require("../controller/device");

//User
router.post("/create-user", createUser);
router.post("/sign-in", userSignIn);
router.get("/get-user/:email", getUser);
router.post("/update-user/:email", updateUser);

//Automatic
router.get("/get-tree-system/:email", getTreeSystemByEmail);
router.post("/create-tree-system", createTreeSystem);
router.put("/update-tree-system/:email", updateTreeSystemByEmail);

//Manual
router.post("/create-value-manual", createValueManual);
router.get("/get-value-manual/:email", getValueManualByEmail);
router.delete("/delete-task/:id", deleteTask);

//Notify
router.post("/create-notify", createNotify);
router.get("/get-notify/:notify_id", getNotify);

//Device
router.post("/create-device", createDevice);
router.get("/get-device", getDevice);

router.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend zone!" });
});

module.exports = router;
