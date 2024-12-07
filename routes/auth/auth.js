const express = require("express");
const router = express.Router();

const csrf = require("../../middlewares/csrf");

const imageUpload = require("../../helpers/image-upload");
const authController = require("../../controllers/auth");

router.get("/login",csrf, authController.get_login);
router.post("/login",csrf, authController.post_login);

router.get("/register",csrf, authController.get_register);
router.post("/register",csrf, authController.post_register);

router.get("/logout", authController.get_logout);

router.get("/profile", csrf, authController.get_profile);
router.post("/profile",csrf, imageUpload.upload.single("images") ,authController.post_profile);

router.get("/watchlist", authController.get_watchlist);



module.exports = router;