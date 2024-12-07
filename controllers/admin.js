const Genre = require("../models/genre");
const Videos = require("../models/videos");
const imageUpload = require("../helpers/image-upload");
const fs = require("fs");
const slugField = require("../helpers/slugfield");
const Movies = require("../models/movies");
const Person = require("../models/person");

exports.get_add_genre = async(req,res) => {
    try {
        res.render("admin/add_genre",{
            title: "Add Genre"
        });
    }
    catch(err){
        console.log(err);
    }
};

exports.post_add_genre = async(req,res) => {
    try {
        const name = req.body.genre;

        const genre = await Genre.findOne({
            where: {
                name: name
            }
        });
    
        if(!genre){
            
            await Genre.create({
                name: name
            });
            return res.render("admin/add_genre", {
                title: "Add Genre",
                message: { text: "Başarıyla Eklendi", class:"success"}
            })
        }
        else {
            return res.render("admin/add_genre", {
                title: "Add Genre",
                message: { text: "Bu tür zaten mevcut.", class:"danger"}
            })
        }

    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map(err => err.message);
            return res.render("admin/add_genre", {
                title: "Add Genre",
                message: {text: validationErrors.join(", "), class: "danger"}
            });
        }
    }
};


exports.get_add_movie = async(req,res) => {
    try {
        const videos = await Videos.findAll();
        const genres = await Genre.findAll();
        res.render("admin/add_movie", {
            title: "Add Movie",
            genres: genres,
            videos: videos
        });
    } catch (error) {
        console.log(error);
    }
};

exports.post_add_movie = async(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    let image = req.body.images;
    if(req.files){
        image = req.files['images'][0].filename;
        fs.unlink("../public/img/" + req.body.images, err => {console.log(err);})
    }
    let background = req.body.background;
    if(req.files){
        background = req.files['background'][0].filename;
        fs.unlink("../public/img/" + req.body.background, err => {console.log(err);})
    }
    const language = req.body.language;
    const budget = req.body.budget;
    const is_home = req.body.is_home == "on" ? 1:0
    const date = req.body.date;
    const genre = req.body.genre;
    try {
        const videos = await Videos.findAll();
        const genres = await Genre.findAll();
        await Movies.create({
            title: title,
            description: description,
            url: slugField(title),
            image: image,
            background: background,
            language: language,
            budget: budget,
            is_home: is_home,
            date: date,
            GenreId: genre
        })
        res.render("admin/add_movie", {
            title: "Add Movie",
            genres: genres,
            videos: videos,
            message: { text: "Başarıyla Eklendi", class:"success"}
        })
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map(err => err.message);
            const videos = await Videos.findAll();
            const genres = await Genre.findAll();
            return res.render("admin/add_movie", {
                title: "Add Movie",
                videos: videos,
                genres: genres,
                message: {text: validationErrors.join(", "), class: "danger"}
            });
        }
    }
};

exports.get_add_people = async(req,res) => {
    try {
        res.render("admin/add_person", {
            title: "Add Movie",
        });
    } catch (error) {
        console.log(error);
    }
};

exports.post_add_people = async(req,res) => {
    const name = req.body.name;
    const biography = req.body.biography;
    let image = req.body.images;
    if(req.file){
        image = req.file.filename;
        if (req.body.image) {
            fs.unlink("../public/img/" + req.body.images, err => {console.log(err);})
        }
    }
    const birthday = req.body.birthday;
    const city = req.body.city;
    const gender = req.body.gender
    const duty_type = req.body.duty_type
    try {
        await Person.create({
            name: name,
            biography: biography,
            url: slugField(name),
            image: image,
            birthday: birthday,
            city: city,
            gender: gender,
            duty_types: duty_type,
        })
        res.render("admin/add_person", {
            title: "Add Person",
            message: { text: "Başarıyla Eklendi", class:"success"}
        })
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map(err => err.message);
            return res.render("admin/add_person", {
                title: "Add Person",
                message: {text: validationErrors.join(", "), class: "danger"}
            });
        }
    }
};

exports.get_add_video = async(req,res) => {
    try {
        const movies = await Movies.findAll();
        res.render("admin/add_video", {
            title: "Add Video",
            movies: movies
        });
    } catch (error) {
        console.log(error);
    }
};

exports.post_add_video = async(req,res) => {
    const title = req.body.title;
    const url = req.body.url;
    const movie = req.body.movie
    try {
        await Videos.create({
            title: title,
            url: url,
            MovieId: movie,
        })
        res.render("admin/add_video", {
            title: "Add Video",
            message: { text: "Başarıyla Eklendi", class:"success"}
        })
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map(err => err.message);
            const movies = await Movies.findAll();
            return res.render("admin/add_video", {
                title: "Add Video",
                movies: movies,
                message: {text: validationErrors.join(", "), class: "danger"}
            });
        }
    }
};



exports.remove_movie = async(req,res) => {
    const id = req.params.movieid;
    try {
        const movie = await Movies.findOne({
            where: {
                id: id
            }
        })
        await movie.destroy();
        res.redirect("/movies")
    } catch (error) {
        console.log(error);
    }
}