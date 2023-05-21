const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;


//armar el get
const apiGames = () => {
    try {
        let allGames = [];
        for(i=1; i<6; i++) {
            let currentUrl = axios.get(
                `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
            );
            let apiInfo = currentUrl
                .then((res) =>
                    res.data.results.map((e) => {
                        return {
                            id: e.id,
                            name: e.name,
                            img: e.background_image,
                            description: e.description,
                            genres: e.genres.map((g) => g.name),
                            platforms: e.platforms.map((p) => p.platform.name),
                            rating: e.rating,
                            realeaseDate: e.released,
                        };
                    })
                );            
            allGames = [...allGames, apiInfo];
        }
        return Promise.all(allGames).then((r) => r.flat());
    } catch (err) {
        console.log(err);
    }
}

const dbGames = async ()=>{    
        const infoDB = await Videogame.findAll({
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes:[],
                    },
                },
            });
            return infoDB;        
}

const allVg = ()=>{
    try {
        return Promise.all([dbGames(), apiGames()]).then((r) => r.flat());
      } catch (err) {
        console.log(err);
      }
}

const apiPlatforms = () => {
    try {
        let allPlat = [];
        for(i=1; i<6; i++) {
            let currentUrl = axios.get(
                `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
            );
            let apiPlat = currentUrl
                .then((res) =>
                res.data.results.map((e) => {
                    return {                           
                        platforms: e.platforms.map((p) => p.platform.name)
                    };
                })
                );                            
            allPlat = [...allPlat, apiPlat];
        }        
        return Promise.all(allPlat)
            .then((r) => r.flat())
            .then((p) => p.map(c=>c.platforms.filter(pl=>pl)))
            .then((l)=>l.flat().filter((k, index, array)=>{
                return index===array.indexOf(k)
            }));
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    allVg,
    apiGames,
    dbGames,
    apiPlatforms
}