const express = require("express");
const router = express.Router();

const imageUpload = require("../../helpers/image-upload");
const isAuth = require("../../middlewares/isAuth");
const isAdmin = require("../../middlewares/isAdmin");

const csrf = require("../../middlewares/csrf");

const adminController = require("../../controllers/admin");

router.get("/add-genre",csrf,isAdmin, isAuth, adminController.get_add_genre);
router.post("/add-genre",csrf, adminController.post_add_genre);

router.get("/add-movie", csrf,isAdmin, isAuth, adminController.get_add_movie);
router.post("/add-movie",csrf,imageUpload.upload.fields([
    {name: "images", maxCount: 1},
    {name: "background", maxCount: 1}
]) , adminController.post_add_movie);

router.get("/add-people",isAdmin, isAuth, csrf, adminController.get_add_people);
router.post("/add-people",csrf,imageUpload.upload.single("images") , adminController.post_add_people);

router.get("/add-video",isAdmin, isAuth, csrf, adminController.get_add_video);
router.post("/add-video",isAdmin, isAuth,csrf, adminController.post_add_video);

router.get("/remove/:movieid",isAdmin, isAuth, adminController.remove_movie);

module.exports = router;
