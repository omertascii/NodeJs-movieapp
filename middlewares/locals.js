module.exports = function(req,res,next) {
    res.locals.isAuth = req.session.isAuth;
    res.locals.nickname = req.session.nickname;
    res.locals.image = req.session.image;
    res.locals.userid = req.session.userid;

    
    res.locals.isAdmin = req.session.roles ? req.session.roles.includes("admin") : false
    next();
};