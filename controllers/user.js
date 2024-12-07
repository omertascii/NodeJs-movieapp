const Movies = require("../models/movies");
const Genre = require("../models/genre");
const Person = require("../models/person");
const Videos = require("../models/Videos");
const Slider = require("../models/slider");
const Comments = require("../models/comments");
const User = require("../models/user");
const Watchlist = require("../models/watchlist");


const { Op } = require("sequelize");


exports.get_index = async(req,res)=> {
    try {
        const movies =  await Movies.findAll({where:{is_home:true},raw:true});
        const sliders = await Slider.findAll();
        res.render("user/index",{
            movies: movies,
            sliders: sliders,
            title: "Anasayfa"
        });
    } catch (error) {
        console.log(error);
    }
};

exports.search = async(req, res) => {
    const movie = req.query.search;
    const size = 9;
    const { page = 0 } = req.query;
    console.log("Arama Terimi:", movie);
    try {
        const result = await Movies.findAndCountAll({
            where: {
                title: { [Op.like]: `%${movie}%` }  
            },
            limit: size,
            offset: page * size
        });
        const movies = result.rows;
        const count = result.count;


        if(movies && movies.length > 0){
            return res.render("user/movies",{
                title:"Movies",
                movies: movies,
                totalItems: count,
                totalPages: Math.ceil(count/size),
                currentPage: page
            })
        } else {
            return res.render("user/movies",{
                title:"Movies",
                movies: [],
                message: { text: "Böyle bir film yok", class:"warning"}
            })
        }
    }catch (error) {
        console.log(error.message);       
    }
}

exports.get_movies = async(req,res) => {
    const size = 9;
    const { page = 0 } = req.query;
    try {
        const result = await Movies.findAndCountAll({
            limit: size,
            offset: page * size
        });
        const movies = result.rows;
        const count = result.count;
        res.render("user/movies",{
            movies: movies,
            title: "Movies",
            totalItems: count,
            totalPages: Math.ceil(count/size),
            currentPage: page
        });
    }
    catch(error){
        console.log(error);
    }
};

exports.get_movie_details = async(req,res)=> {
    const slug = req.params.slug;
    try { 
        const movie = await Movies.findOne({
            where: {
                url: slug
            },
            include: {
                model: Person
            }
        });
        const comments = await movie.getComments({
            include: [User]
        });
        const genre = await movie.getGenre();
        const videos = await movie.getVideos();
        res.render("user/movie_details", {
            movie: movie,
            genre: genre,
            videos: videos,
            comments: comments,
            title: "MovieDetails"
        });
    }
    catch(error){
        console.log(error);
    }
};

exports.post_movie_details = async(req,res) => {
    const slug = req.params.slug;
    try {
        const message = req.body.message;
        const userid = req.body.userid;
        const rating = req.body.rating;

        const movie = await Movies.findOne({
            where: {
                url: slug
            }
        });
        const newcomments = await Comments.create({
            message: message,
            rating: rating,
            UserId: userid
        });

        await newcomments.setMovies(movie.id);
        res.redirect(`/movies/${slug}`);
    } catch (error) {
        console.log(error);
    }
};

exports.add_watchlist = async(req,res) => {
    const id = req.params.movieid;
    try {
        const user = await User.findOne({
            where: {
                nickname: req.session.nickname
            }
        });
        let watchlist = await user.getWatchlist();

        if (!watchlist){
            await user.createWatchlist()
        }
        const movie = await watchlist.getMovies({ where: {id: id}});
        if(movie.length === 0) {
            await watchlist.addMovie(id);
        }
        return res.redirect("/auth/watchlist");
    } catch (error) {
        console.log(error);
    }
};

exports.remove_watchlist = async(req,res) => {
    const id = req.params.movieid;

    try {
        const user = await User.findOne({
            where: {
                nickname: req.session.nickname
            }
        });
        let watchlist = await user.getWatchlist();

        const movie = await watchlist.getMovies({ where: {id}});
        await watchlist.removeMovie(id);
        return res.redirect("/auth/watchlist");
    } catch (error) {
        console.log(error);
    }
};


exports.get_peoples = async(req,res) => {
    const size = 9;
    const { page = 0 } = req.query;
    try {
        const result = await Person.findAndCountAll({
            limit: size,
            offset: page * size
        });
        const peoples = result.rows;
        const count = result.count;
        res.render("user/people",{
            peoples: peoples,
            title: "Peoples",
            totalPages: Math.ceil(count/size),
            totalItems: count,
            currentPage: page
        })
    } catch (error) {
        console.log(error);
    }
};

exports.get_people_details = async(req,res) => {
    const slug = req.params.slug;
    try{
        const people = await Person.findOne({
            where: {
                url: slug
            },
            include: {
                model: Movies
            }
        });
        res.render("user/people_details",{
            people: people,
            title: "PeopleDetails"
        })
    }catch(err){
        console.log(err);
    }
};