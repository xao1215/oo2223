import './App.css';
import React from 'react';
import Game from './components/Game'
import Navbar from './components/Navbar'

function App() {

    return (
        <>
            <Game></Game>
            {/* tetris, game of life, weather */}
            <Navbar></Navbar>
        </>
    );

}

export default App;
