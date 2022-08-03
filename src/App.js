import './App.css';
import React from 'react';
import Snake from './components/Snake'
import GameOfLife from './components/GameOfLife'
import Navbar from './components/Navbar'
import Tetris from './components/Tetris'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

    return (
        <>

            <BrowserRouter>
                <Routes>

                    <Route element={<><Navbar/><Snake/></>} path="/"/>
                    <Route element={<><Navbar/><GameOfLife/></>} path="/gameoflife"/>
                    <Route element={<><Navbar/><Tetris/></>} path="/tetris"/>

                    {/* tetris, game of life, weather */}
                </Routes>
            </BrowserRouter>
        
        </>
    );

}

export default App;
