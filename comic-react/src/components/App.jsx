import React from "react";
import { Routes,Route } from "react-router-dom";
// import Navbar from "./NavBar/Navbar";
import Navbar from "./Header_/Header";
import Stats from "./Stats/Stats";
import Header from "./Header/Header";
import { useState, useEffect } from "react";
import './app.css';
function App() {
    const [actualStats1, setActualStats1] = useState({});
    const [actualStats2, setActualStats2] = useState({});


    useEffect(() =>{

        // setActualStats1(JSON.parse(localStorage.getItem("marvel_character1")));
        // setActualStats2(JSON.parse(localStorage.getItem("marvel_character2")));
        console.log(1);
    }, [])
    // console.log(actualStats);
    return (
        <div className="app">
        <Navbar />
        <Routes>
            <Route path="/" element={<Header setActualStats1={setActualStats1}  setActualStats2={setActualStats2}  />} />  
            <Route path="/stats" element={<Stats setActualStats1={setActualStats1} actualStats1={actualStats1} setActualStats2={setActualStats2} actualStats2={actualStats2}/>} />   
        </Routes>
        </div>
    )
}

export default App