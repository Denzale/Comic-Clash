const express = require('express');
const cors = require('cors');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const Public = '8489e713705f736dca0b6f51c5d819dc';
const Private = '73e45a7c992ef2b25c82184402850764ba83ccf4';


app.get('/marvelCharacters', (req, res) =>{
    let uuidString = uuidv4();
    let hash = md5(uuidString + Private + Public);
    let random = Math.floor(Math.random() * (1462 - 0) ) + 0;
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${uuidString}&apikey=8489e713705f736dca0b6f51c5d819dc&hash=${hash}&limit=100&offset=${random}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    }).then(reponse => reponse.json())
    .then(marvelData =>{
        // console.log(data);
        let results = marvelData.data.results.map(element => {
            // {id: element.id, name: element.name, thumbnail: [element.thumbnail.path, element.thumbnail.extension]}
            return  element.name;
        });
        res.json(results);
    })

})


app.post('/marvelDescription', (req, res) =>{
    let name = req.body.name;
    let uuidString = uuidv4();
    let hash = md5(uuidString + Private + Public);
    let random = Math.floor(Math.random() * (1462 - 0) ) + 0;
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${uuidString}&apikey=8489e713705f736dca0b6f51c5d819dc&hash=${hash}&name=${name}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    }).then(reponse => reponse.json())
    .then(marvelData =>{
        // console.log(data);
        
        res.json(marvelData.data.results[0].description);
    })

})


app.post('/powerstats', (req, res) =>{
    let name = req.body.name;

    fetch(`https://superheroapi.com/api/175652555198344/search/${name}`, {
        method: 'get',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    }).then(reponse => reponse.json())
    .then(marvelData =>{
        console.log('Sucessful');
        // console.log(marvelData);
        res.json(marvelData)
    })
})


app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})