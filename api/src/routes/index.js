
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const {Videogame, Genre} = require('../db.js')
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
var apiInfo =[];

const getApiInfo = async (url) =>{
    
    if(apiInfo.length < 99){
    const apiUrl = await axios.get(url);
   
    apiInfo = apiInfo.concat(apiUrl.data.results.map(e =>{
        return{
            id:e.id,
            name:e.name,
            img:e.background_image,
            released:e.released,
            rating:e.rating,
            description:e.description,
            genres:e.genres.map(el=>el.name),
            plataform: e.platforms.map(e => e.platform.name),
        }
    }))
    return apiInfo.concat(getApiInfo(apiUrl.data.next))
    
}else {
    return apiInfo
};
}
const getInfo = async () =>{
    const dbData = await Videogame.findAll({
        include:{
            model:Genre,
            attribute: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return dbData
}
const allGames = async () => {
    const api = await getApiInfo(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const dbInfo = await getInfo();
    const allInfo = api.concat(dbInfo);
    return allInfo
}


router.get('/videogames',async(req,res)=>{
    const name = req.query.name;
    const gam = await allGames();
    if(name){
        const gamer = await gam.filter(el=>el.name.toLowerCase().includes(name.toLocaleLowerCase()));
        gamer.length ? res.status(200).send(gamer) : res.status(404).send('no se encontro ese dogi');
        
    }else {
        res.status(200).send(gam)
    }
});




router.get('/genres',async(req,res)=>{
    const todo = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    let dale =await  todo.data.results.map(el=>el.name);
    dale=dale.join().split(',');

    dale.forEach((e)=>{
     Genre.findOrCreate({
         where:{
             name:e
         }
     })
    })
    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres) 
})
router.get('/videogames/:id',async(req,res,next)=>{
    const {id} = req.params;
    
    if (id.includes('-')){
    const gameDB = await Videogame.findOne({
        where:{id},
        include:[Genre],
    });
    return res.send(gameDB);
    }
    const gameApi = await axios.get( `https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        res.send(gameApi.data);
        
        
        
});
router.post('/videogames', async(req, res) => {
    let { name, 
        description, 
        released, 
        rating,
        genres, 
        img, 
        plataform 
    } = req.body;

    

    let videogameCreated = await Videogame.create({
        name, 
        description, 
        released, 
        rating, 
        img,
        genres, 
        plataform
    })

    genres.forEach(e => {
        Genre.findOrCreate({
            where: {
                name: e,
            }
        })
    })

    let genresDb = await Genre.findAll({
        where: {
            name: genres.map(e => e)
        }
    })

    videogameCreated.addGenre(genresDb)
    res.send('Videogame creado correctamente')
})
router.get('/filtgen',async(req,res)=>{
    const name = req.query.name;
    const dale = await allGames();
    if(name === 'all'){
        res.status(200).send(dale)
    }
   const fil = await dale.filter(el=>el.genres.includes(name));
   fil.length ? res.status(200).send(fil) : res.status(404).send('no esta ese filtro')

})
router.post('/genero',async(req,res)=>{
    let {name} =req.body;
    const dale = await genres.create({
        name
    })
   res.send(dale)


})


module.exports = router;
