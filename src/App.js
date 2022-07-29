import './App.css';
import React from 'react';
import Game from './components/Game'
import Navbar from './components/Navbar'

function App() {

    return (
        <>
            <Navbar></Navbar>

            <Game></Game>
            {/* tetris, game of life, weather */}
        </>
    );

}

export default App;
