const User = require("../models/user");
const bcrypt = require("bcrypt");
const imageUpload = require("../helpers/image-upload");
const fs = require("fs");
const Watchlist = require("../models/watchlist");
const Movies = require("../models/movies");
const Role = require("../models/role");
const { raw } = require("mysql2");
const crypto = require("crypto");


exports.get_login = async(req,res) => {
    try {
        res.render("auth/login", {
            title: "Login"
        })
    } catch (error) {
        console.log(error);
    }
};

exports.post_login = async(req,res) => {
    const nickname = req.body.nickname;
    const password = req.body.password;
    try{
        const user = await User.findOne({
            where: {
                nickname: nickname
            }
        });
        if (!user){
            return res.render("auth/login", {
                message: { text: "Böyle bir kullanıcı adı yok!", class:"danger"},
                title: "Login"
            })
        }else {
            const match = await bcrypt.compare(password, user.password);
            if (match){
                const userRoles = await user.getRoles({
                    attributes: ["name"],
                    raw: true
                });
                const url = req.query.returnUrl || "/";
                req.session.roles = userRoles.map((role) => role["name"]);
                req.session.isAuth = true;
                req.session.nickname = user.nickname;
                req.session.image = user.image;
                req.session.userid = user.id;
                return res.redirect(url);
            }else{
                return res.render("auth/login",{
                    message: { text: "Parola yanlış!", class:"danger"},
                    title: "Login"
                })
            }
        }
    }catch(error){
        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map(err => err.message);
            return res.render("auth/login", {
                title: "Login",
                message: {text: validationErrors.join(", "), class: "danger"}
            });
        }
    }
};

exports.get_register = async(req,res) => {
    try {
        res.render("auth/register",{
            title: "Register",
        })
    } catch (error) {
        console.log(error);
    }
};

exports.post_register = async(req,res) => {
    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;
    const hashedPassword = await bcrypt.hash(password,10);

    try {
        const user = await User.findOne({
            where: {
                nickname: nickname
            }
        });
        if(!user){
            const user = await User.findOne({where: {email: email}})
            if(!user){
                if(password === repassword){
                    const newuser = await User.create({
                        nickname: nickname,
                        email: email,
                        password: hashedPassword
                    });

                    const guestRole = await Role.findOne({
                        where: {
                            name: "guest"
                        }
                    })
                    await newuser.addRole(guestRole)
                    return res.redirect("login");
                }else {
                    return res.render("auth/register", {
                        title: "Register",
                        message: { text: "Şifreler uyuşmuyor!", class:"warning"}
                    })
                }
            }else {
                return res.render("auth/register",{
                    title: "Register",
                    message: {text: "Bu mail kullanılıyor!", class:"warning"}
                });
            }
        }else {
            return res.render("auth/register",{
                title: "Register",
                message: { text: "Bu kullanıcı adı ile bir hesap mevcut", class:"warning"}
            });
        }
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map(err => err.message);
            return res.render("auth/register", {
                title: "Register",
                message: {text: validationErrors.join(", "), class: "danger"}
            });
        }
    }
};

exports.get_logout = async(req,res) => {
    try {
        await req.session.destroy();
        return res.redirect("/auth/login")
    } catch (error) {
        console.log(error);
    }
};

exports.get_profile = async(req,res) => {
    try {
        const user = await User.findOne({
            where: {
                nickname: req.session.nickname
            }
        });
        res.render("auth/profile",{
            user: user,
            title: "Profile"
        })
    } catch (error) {
        console.log(error);
    }
};

exports.post_profile = async(req,res) => {
    const id = req.body.id
    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password,10);
    let image = req.body.image
    if(req.file){
        image = req.file.filename;
        fs.unlink("../public/img/" + req.body.image, err => {console.log(err);})
    }
    try {
        await User.update({
            nickname: nickname,
            email: email,
            password: hashedPassword,
            image: image
        },{
            where: {
                id: id
            }
        });

        const updatedUser = await User.findByPk(id);
        req.session.nickname = updatedUser.nickname
        req.session.image = updatedUser.image
        res.render("auth/profile", {
            title: "Profile",
            user: updatedUser,
            message: {text: "Bilgileriniz başarıyla güncellendi!", class:"success"}
        })
    } catch (error) {
        console.log("Error:",error);
        return res.status(500).send('Internal Server Error')
    }
};

exports.get_profile = async(req,res) => {
    try {
        const user = await User.findOne({
            where: {
                nickname: req.session.nickname
            }
        });
        res.render("auth/profile",{
            user: user,
            title: "Profile"
        })
    } catch (error) {
        console.log(error);
    }
};

exports.post_profile = async(req,res) => {
    const id = req.body.id
    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password,10);
    let image = req.body.image
    if(req.file){
        image = req.file.filename;
        fs.unlink("../public/img/" + req.body.image, err => {console.log(err);})
    }
    try {
        await User.update({
            nickname: nickname,
            email: email,
            password: hashedPassword,
            image: image
        },{
            where: {
                id: id
            }
        });

        const updatedUser = await User.findByPk(id);
        req.session.nickname = updatedUser.nickname
        req.session.image = updatedUser.image
        res.render("auth/profile", {
            title: "Profile",
            user: updatedUser,
            message: { text: "Bilgileriniz başarıyla güncellendi!", class: "success"}
        })
    } catch (error) {
        console.log("Error:",error);
        return res.status(500).send('Internal Server Error')
    }
};


exports.get_watchlist = async(req,res) => {
    const user = await User.findOne({
        where: {
            nickname: req.session.nickname
        }
    });
    const watchlist = await user.getWatchlist();
    const movies = await watchlist.getMovies();
    try {
        if(movies.length > 0){
            return res.render("auth/watchlist",{
                title: "Profile",
                user: user,
                movies: movies,
            });
        }
        else{
            return res.render("auth/watchlist",{
                title: "Profile",
                user: user,
                movies: movies,
                message: {text:"İzleme Listeniz Boş", class:"warning"}
            });
        }
    } catch (error) {
        console.log(error);
    }
};




