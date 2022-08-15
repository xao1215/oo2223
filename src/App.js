import './App.css';
import React from 'react';
import Snake from './components/Snake'
import GameOfLife from './components/GameOfLife'
import Navbar from './components/Navbar'
import TypeRacer from './components/TypeRacer'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

    // do context for navbar link mapping ?  

    return (
        <>

            <BrowserRouter>
                <Routes>

                    <Route element={<><Navbar/><Snake/></>} path="/"/>
                    <Route element={<><Navbar/><GameOfLife/></>} path="/gameoflife"/>
                    <Route element={<><Navbar/><TypeRacer/></>} path="/typeracer"/>

                    {/* tetris, weather, avoiding obstacles top and bottom rand generated, typeracer */}
                </Routes>
            </BrowserRouter>
        
        </>
    );

}

export default App;
