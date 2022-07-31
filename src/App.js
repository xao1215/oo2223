import './App.css';
import React from 'react';
import Snake from './components/Snake'
import GameOfLife from './components/GameOfLife'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

    return (
        <>
            <Navbar></Navbar>

            <BrowserRouter>
                <Routes>
                    <Route element={<><Snake/></>} path="/"/>
                    <Route element={<><GameOfLife/></>} path="/gameoflife"/>

                    {/* tetris, game of life, weather */}
                </Routes>
            </BrowserRouter>
        
        </>
    );

}

export default App;
