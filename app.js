const express = require("express");
const app = express();

const sequelize = require("./data/db");
const dummydata = require("./data/dummy-data");

const path = require("path")

const session = require("express-session");
const csurf = require("csurf");
const locals = require("./middlewares/locals");

if(process.env.NODE_ENV == "production"){
    require("./production")(app);
}


const SequelizeStore = require("connect-session-sequelize")(session.Store)

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth/auth");
const adminRouter = require("./routes/admin/admin");


const Person = require("./models/person");
const Movies = require("./models/movies");
const Genre = require("./models/genre");
const Videos = require("./models/videos");
const Slider = require("./models/slider");
const User = require("./models/user");
const Comments = require("./models/comments");
const Watchlist = require("./models/watchlist");
const Role = require("./models/role");




app.use(session({
    secret: "6862dabf-ee8a-4a11-b654-3ac25480b3d0",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000*60
    },
    store: new SequelizeStore({
        db: sequelize
    })
}))


app.use(locals);
app.use(csurf());   



app.use("/admin", adminRouter)
app.use("/auth", authRouter);
app.use("", userRouter);








Role.belongsToMany(User, {through: "userRole"});
User.belongsToMany(Role, {through: "userRole"});

Watchlist.hasOne(User);
User.belongsTo(Watchlist);

Watchlist.belongsToMany(Movies, {through: "watchlistmovie"});
Movies.belongsToMany(Watchlist, {through: "watchlistmovie"});

User.hasMany(Comments);
Comments.belongsTo(User);

Movies.belongsToMany(Comments, {through: "moviecomments"});
Comments.belongsToMany(Movies, {through: "moviecomments"});

Genre.hasMany(Movies);
Movies.belongsTo(Genre);

Movies.hasMany(Videos);
Videos.belongsTo(Movies);

Movies.belongsToMany(Person, {through: "moviepersons"});
Person.belongsToMany(Movies, {through:"moviepersons"});

Movies.hasOne(Slider);
Slider.belongsTo(Movies);

async function sync(){
    try {
        await sequelize.sync({ force: true })
        await dummydata();
        console.log("mysql baglantıı kuruldu");
    } catch (error) {
        console.log(error);
    }
}

sync();




const port = process.env.PORT || 3000;

app.listen(port,(req,res) => {
    console.log(`listening on port ${port}`);
});