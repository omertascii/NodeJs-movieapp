module.exports = (req,res,next) => {
    if (!req.session.roles.includes("admin")){
        return res.redirect("/?returnUrl=" + req.originalUrl)
    };
    next()
};