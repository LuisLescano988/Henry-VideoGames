const express = require("express");
const { allVg, dbGames, apiPlatforms } = require('../controllers/videogames')
const { Videogame, Genre } = require("../db");
const { Router } = require("express");
const axios = require("axios");
const { where } = require("sequelize");
const router = Router();
const { API_KEY } = process.env;
// const gamesDbFlatted = allVg()

router.get('/', async (req, res) => {
  const name = req.query.name;
  const videogamesTotal = await allVg();
  if (name) {
    const videogameName = videogamesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    videogameName.length
      ? res.status(200).send(videogameName)
      : res.status(404).send("Videogame not found");
  } else {
    return res.status(200).send(videogamesTotal);
  }
});

router.get('/platforms', async (req, res) => {
  const platformsTotal = await apiPlatforms();
  platformsTotal.length > 0
    ? res.status(200).send(platformsTotal)
    : res.status(404).send("not platforms founded")
});

router.post('/', async (req, res) => {
  const { name, description, releaseDate, rating, platforms, img, genres } = req.body;
  const gamesDb = await Videogame.findAll({ where: { dbCreated: true } })
  console.log(gamesDb.length);
  if (!name || !description || !platforms) res.status(400).json({ msg: "insuficient filled data" })
  {
    if (gamesDb.length < 2){
      try {
        let newGame = await Videogame.create({ name, description, releaseDate, rating, platforms, img })        
        let genresDb = await Genre.findAll({
          where: { name: genres }
        })
        newGame.addGenre(genresDb)
        res.status(200).send('Video Juego Creado')
      } catch (error) {
        console.log(error)
      }
    }
    else res.status(404).send('Database is full, cannot create new game')
  }
})




router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes('-')) {
      let gamesId = await Videogame.findByPk(id, {
        include: Genre,
      })
      if (gamesId) return res.status(200).send([gamesId][0]);
    } else {
      let findApi =
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
          // apiGames()
          .then((...resp) => {
            let gameApiId = resp.map(game => {
              console.log(game)
              return {
                id: game.data.id,
                name: game.data.name,
                description: game.data.description,
                genres: game.data.genres.map((e) => e.name),
                releaseDate: game.data.released,
                img: game.data.background_image,
                rating: game.data.rating,
                platforms: game.data.platforms.map((e) => e.platform.name)
              }
            })
            gameApiId.length > 0 ?
              res.send(gameApiId[0]) :
              res.status(404).send({ msg: 'game not found' })
          })
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name: name } = req.body;

  try {
    Videogame.findByPk(id)
      .then((r) => r.update({ name: name }));
    res.send(200, "Videogame modified!");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/del/:id", (req, res) => {
  const { id } = req.params;
  try {
    Videogame.findByPk(id)
      .then((r) => r.destroy({ id: id }))
      .then(res.status(200, "Videogame deleted!"));
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;