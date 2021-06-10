const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const {sequelize} = require("./config/db")
const {anime, Anime} = require ("./models/anime.model");
const app = express();
const port = 3000;

sequelize.sync({force: true});

app.set("view engine", "ejs");


//variables

//rutas
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

//read
app.get("/", (req, res) => {

    (async () => {
        let anime =  await Anime.findAll();

        // console.log(anime);
        console.log(JSON.stringify(anime));

        res.render("pages/index");

        console.log('animes.lenght', animes.lenght);
        animes.forEach((anime) => {
            console.log('anime.name', anime.name);
        });

        res.render("pages/index",{
            animes: animes,
        });
        


    })();
});

//creat
app.get("/create", (req, res) => {
    res.render("pages/create");
});

app.post("/create", (req, res) => {
    // req.body los datos enviados desde un [formulario] post
    console.log("req.body.nombre (nombre)", req.body.nombre);
    console.log("req.body.genero (genero)", req.body.genero);
    let name = req.body.nombre;
    let genero = req.body.genero;

    (async () => {
        let anime = await Game.create({
            name: name,
            genre: genre,
        });

        res.redirect("/");
    })();
});


//update
app.get('/edit:id', (req, res , next) => {
    let id = req.params.id;

    (async () => {
        let anime = await Anime.findByPk(id);

        res.render('update',{
            anime: anime,
        });
    })();
});

app.post('/edit', (req, res, next) => {
    let id = req.body.id;
    let nombre = req.body.name;
    let genero = req.body.genere;
    
    (async() =>{
        let anime = await Anime.findByPk(id);

        anime.nombre = nombre;
        anime.genero = genero;

        await anime.save();

        res.redirect('/')
    })();
});


//delete
app.post('/delete', (req,res,next) => {
    (async () => {
        let id = req.body.id;

        await Anime.destroy({
            where: {
                id: id,
            }
        });

        res.render('/')
    })();
});


app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});