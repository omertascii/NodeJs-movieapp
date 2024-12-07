const express = require("express");
const router = express.Router();
const csrf = require("../../middlewares/csrf");

const userController = require("../../controllers/user");
const isAuth = require("../../middlewares/isAuth");

router.get("/people/:slug", isAuth, userController.get_people_details);

router.get("/peoples", isAuth, userController.get_peoples);

router.get("/movies/:slug",csrf, isAuth, userController.get_movie_details);
router.post("/movies/:slug", isAuth, userController.post_movie_details);

router.get("/add-to-watchlist/:movieid", userController.add_watchlist);

router.get("/watchlist/remove/:movieid", userController.remove_watchlist);

router.get("/search" ,userController.search);

router.get("/movies", isAuth, userController.get_movies);

router.get("/" ,userController.get_index);

module.exports = router;