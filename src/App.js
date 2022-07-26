import './App.css';
import React from 'react';
import Game from './components/Game'
import Navbar from './components/Navbar'

function App() {

    // const [num, setNum] = useState(0)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setNum(num => num + 1)
    //     }, 500)
    //     return () => { console.log("iefw");clearInterval(interval) }
    // }, [])

    return (
        <>
            <Navbar></Navbar>
            <Game></Game>
        </>
    );

}

export default App;
