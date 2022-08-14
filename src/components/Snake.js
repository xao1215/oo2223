import React, { useState, useEffect, useRef, useCallback } from 'react';
import Pause from "./Pause"
const sx = 750
const sy = 500
const d = 25
const startingSpeed = 120
const decreasePerTurn = 0.9

// change so that on input => start a recursive function

function Game() {
    const [snake, setSnake] = useState([{ x: 0, y: 0 }])
    const direction = useRef({ prev: 0, next: -1 })

    const [size, setSize] = useState({ x: sx, y: sy, divisor: d })
    const [game, setGame] = useState(0)
    const [food, setFood] = useState({ x: -1, y: -1 })
    const speed = useRef(startingSpeed)

    const [time, setTime] = useState(0)
    const focusContainer = useRef(null)

    const handleKeyDown = (e) => {
        let key = e.keyCode
        if (key === 37) { key = (direction.current.prev === 39) ? 39 : 37 }
        else if (key === 39) { key = (direction.current.prev === 37) ? 37 : 39 }
        else if (key === 38) { key = (direction.current.prev === 40) ? 40 : 38 }
        else if (key === 40) { key = (direction.current.prev === 38) ? 38 : 40 }
        else {
            if (direction.current.next > 36 && direction.current.next < 41) {
                //pause
                direction.current.prev = direction.current.next
                direction.current.next = 0
            } else {
                //unpause, press any key
                direction.current.next = direction.current.prev
                direction.current.prev = key
            }
            return
        }
        // edit this to stop at random key
        // direction.current.current = direction.current.next
        direction.current.next = key
        if(direction.current.next === -1){setGame(1)}
    }

    const generateFood = () => {
        let y = Math.floor(Math.random() * sy / d)
        let x = Math.floor(Math.random() * sx / d)
        while (snake.some(snake => ((snake.x === x) && (snake.y === y)))) {
            y = Math.floor(Math.random() * sy / d)
            x = Math.floor(Math.random() * sx / d)
        }
        // setFood({ x: 0, y: 0 })
        setFood({ x: x, y: y })
    }

    const run = ()  => {
        setTime(time => time + 1)
        setTimeout(run, speed.current)
    }

    useEffect(() => {
        const newY = Math.floor(Math.random() * sy / d)
        const newX = Math.floor(Math.random() * sx / d)

        setSnake([{ y: newY, x: newX }])
        generateFood()

        document.addEventListener("keydown", handleKeyDown)

        focusContainer.current.focus()

        run()
    }, [])

    useEffect(() => {
        let newPos = { ...snake[snake.length - 1] }

        switch (direction.current.next) {
            case 37: newPos.x = (newPos.x - 1 < 0) ? (sx / d - 1) : (newPos.x - 1); break; //left
            case 39: newPos.x = (newPos.x + 1 > sx / d - 1) ? (0) : (newPos.x + 1); break; //right
            case 40: newPos.y = (newPos.y + 1 > sy / d - 1) ? (0) : (newPos.y + 1); break; //down
            case 38: newPos.y = (newPos.y - 1 < 0) ? (sy / d - 1) : (newPos.y - 1); break; //up
            default: return;
        }

        for (let i = 0; i < snake.length - 3; i++) {
            if (snake[snake.length - 1].x === snake[i].x && snake[snake.length - 1].y === snake[i].y) {
                speed.current = startingSpeed
                setGame(snake.length - 1)
                direction.current.next = 0
                direction.current.prev = 0
                const newY = Math.floor(Math.random() * sy / d)
                const newX = Math.floor(Math.random() * sx / d)
                setSnake([{ y: newY, x: newX }])
                generateFood()
                return;
            }
        }

        direction.current.prev = direction.current.next
        let posArray = [...snake]
        posArray.push(newPos)
        if (snake[snake.length - 1].x === food.x && snake[snake.length - 1].y === food.y) {
            generateFood()
            if (speed.current > 39) { speed.current = speed.current - decreasePerTurn }
        } else {
            posArray.shift()
        }
        setSnake(posArray)


    }, [time])

    return (
        <div className="flex h-full w-full relative items-center justify-center">

            {/*outline with gradient*/}
            <div className="bg-gradient-to-tr   from-amber-400 via-red-400 to-lime-400 flex justify-center items-center relative outline-none" style={{ width: size.x + 5, height: size.y + 5 }}>
                <div ref={focusContainer} tabIndex={-1} className="bg-custom-900 relative outline-none" style={{ width: size.x, height: size.y }}>
                    <div style={{ width: sx, height: sy }} className="absolute flex flex-col ">
                        {(new Array(sy / d)).fill(0).map((ting, i) => <div className={`${(i === (sy / d) - 1) ? "" : "border-b"} opacity-50 border-slate-700 relative t-30`} key={i} style={{ width: sx, height: d }}></div>)}
                    </div>
                    <div style={{ width: sx, height: sy }} className="absolute flex flex-row ">
                        {(new Array(sx / d)).fill(0).map((ting, i) => <div className={`${(i === (sx / d) - 1) ? "" : "border-r"} opacity-50 border-slate-700 relative t-30`} key={i} style={{ width: d, height: sy }}></div>)}
                    </div>

                    <Food position={food}></Food>
                    <Snake positions={snake}></Snake>

                    {(0 >= direction.current.next) && <Pause gameState={game} score={snake.length - 1}></Pause>}

                    {/* just the border */}
                    {/* <div zindex={2} className="bg-transparent border absolute border-blue-500" style={{ width: size.x, height: size.y, top: 0, left: 0 }}></div> */}
                </div>

            </div>

        </div>

    );
}

const Food = React.memo(({ position }) => {
    // type of food?
    return (
        <>
            {(position.x === -1) ? <></> : <div className="outline-none bg-red-800 absolute" style={{ width: d, height: d, top: position.y * d, left: position.x * d }}></div>}
        </>
    )
})

const Snake = ({ positions }) => {
    return (
        <>
            {positions.map((pos, i) => {
                return <div  /*tabIndex={3}*/ key={i} className="snake outline-none bg-green-600 absolute" style={{ width: d, height: d, top: pos.y * d, left: pos.x * d }}></div>
            })}
        </>
    )
}

export default Game;
