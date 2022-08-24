import './App.css';
import React from 'react';
import Snake from './components/Snake'
import GameOfLife from './components/GameOfLife'
import Navbar from './components/Navbar'
import TypeRacer from './components/TypeRacer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

function App() {

    // do context for navbar link mapping ?
    // just put nav as fixed   

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>

                        <Route element={<><Navbar/><Snake/></>} path="/"/>
                        <Route element={<><Navbar/><GameOfLife/></>} path="/gameoflife"/>
                        <Route element={<><Navbar/><TypeRacer/></>} path="/typeracer"/>

                        {/* tetris, weather, avoiding obstacles top and bottom rand generated, typeracer */}
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        
        </>
    );

}

export default App;
