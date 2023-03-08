import React, { useState } from "react";
import AvengerImage from "./images/avengers.jpg"
import { useNavigate } from "react-router-dom";
import "./Header.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Header({setActualStats1, setActualStats2}){
    const [heroName1, setHeroName1] = useState('');
    const [heroName2, setHeroName2] = useState('');
    const [count, setCount] = useState(0);
    
    let names = [
        'Iron Man',
        'Hulk',
        'Thor',
        'Black Panther',
        'Thanos',
        'Falcon',
        'Wolverine',
        'Doctor Strange',
        'Doctor Doom',
        'Shang-Chi',
        'She-Hulk',
        'Scarlet Witch',
        'Captain America',
        'Vision',
        'Clint Barton',
        'Black Widow',
        'War Machine',
        'Abomination',
        'Bucky',
        'Captain Marvel',
        'Ghost Rider',
        'Guardians of the Galaxy',
        'Hawkeye',
        'Namor',
        'Quicksilver',
        'Storm',
        'Magneto',
        'Moon Knight',
        'Wong',
        'Hela',
        'Cable',
      ]
    const navigate = useNavigate();
    const handleChange1 = (heroName1Passed) => {
        console.log(heroName1Passed);
                  fetch(`http://localhost:5000/powerstats`, {
                    method: 'post',
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                    body: JSON.stringify({
                        name: heroName1Passed
                    })
                }).then(response => response.json())
                .then(data =>{
                    fetch(`http://localhost:5000/marvelDescription`, {
                        method: 'post',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        body: JSON.stringify({
                            name: heroName1Passed
                        })
                    }).then(response => response.json())
                    .then(data2 =>{
                        console.log(data);
                        // console.log({name: data['results-for'], powerstats: Object.entries(data.results[0].powerstats)})
                        setActualStats1({name: data['results-for'], powerstats: Object.entries(data.results[0].powerstats), image: data.results[0].image.url, description: data2})
                        window.localStorage.setItem("marvel_character1", JSON.stringify({name: data['results-for'], powerstats: Object.entries(data.results[0].powerstats), image: data.results[0].image.url, description: data2}))
                        if(heroName2.length){
                            navigate("/stats");
                        }
                    })
                })      


    };
    const handleChange2 = (heroName2Passed) => {
        console.log(heroName2Passed);
                  fetch(`http://localhost:5000/powerstats`, {
                    method: 'post',
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                    body: JSON.stringify({
                        name: heroName2Passed
                    })
                }).then(response => response.json())
                .then(data3 =>{
                    console.log()
                    fetch(`http://localhost:5000/marvelDescription`, {
                        method: 'post',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        body: JSON.stringify({
                            name: heroName2Passed
                        })
                    }).then(response => response.json())
                    .then(data4 =>{
                        console.log("handlechange2", data3);
                        // console.log({name: data['results-for'], powerstats: Object.entries(data.results[0].powerstats)})
                        setActualStats2({name: data3['results-for'], powerstats: Object.entries(data3.results[0].powerstats), image: data3.results[0].image.url, description: data4});
                        window.localStorage.setItem("marvel_character2", JSON.stringify({name: data3['results-for'], powerstats: Object.entries(data3.results[0].powerstats), image: data3.results[0].image.url, description: data4}));
                        if(heroName1.length){
                            navigate("/stats");
                        }
                    })
                })
                if(heroName1.length > 0 && heroName2.length > 0){
                    console.log("hey");
                }
    };
    // console.log("heroname1", heroName1);
    // console.log("heroname2", heroName2);
    return (
        <div className="m-t-30 z-depth-1 p-50 b-r headerContainer">
            <h1  className="center f-s-35 f-w-500  grey-text darken-4-text">Comics Clash</h1>
            <div className="header">
                <div>
                    <img className="header-image b-r" src={AvengerImage} alt="avenger" />
                </div>
                <div >                     
                    <FormControl style={{width: "100%"}}>
                        <InputLabel id="demo-simple-select-label">Avengers1</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={heroName1}
                        label="Avenger1"
                        name= "Avenger1"
                        onChange={(event) => {
                            handleChange1(event.target.value);
                            setHeroName1(event.target.value);
                        }}
                        >
                        {names.map((item, index) =>{

                        return <MenuItem key={index} value={item}>{item}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                    <FormControl style={{width: "100%", margin: "20px 0px"}}>
                        <InputLabel id="demo-simple-select-label2">Avengers2</InputLabel>
                        <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select2"
                        value={heroName2}
                        label="Avenger2"
                        name="Avengers2"
                        onChange={(event) => {
                            handleChange2(event.target.value);
                            setHeroName2(event.target.value);
                        }}
                        >
                        {names.map((item, index) =>{

                        return <MenuItem key={index} value={item}>{item}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                </div>
            </div>   
        </div>        
    )
}


export default Header