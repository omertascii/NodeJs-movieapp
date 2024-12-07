const slugify = require("slugify");

const options = {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: false,
    locale: true,
    trim: true
};


module.exports = function slugField(str){
    return slugify(str,options)
};