import { ScaleIcon } from '@heroicons/react/solid';
import React, { useState, useEffect, useRef } from 'react';
import Pause from "./Pause"
const sx = 735
const sy = 490
const d = 35
const speed = 20

function Game() {

    const [size, setSize] = useState({ x: sx, y: sy, divisor: d })

    const [snake, setSnake] = useState([{ x: 0, y: 0 }])
    const dir = useRef({ current: 0, next: 0 })

    const [food, setFood] = useState({ x: -1, y: -1 })


    const [time, setTime] = useState(0)
    const focusContainer = useRef(null)
    const sizeContainer = useRef(null)

    const handleKeyDown = (e) => {
        let key = e.keyCode
        if (key === 37) { key = (dir.current.current === 39) ? 39 : 37 }
        else if (key === 39) { key = (dir.current.current === 37) ? 37 : 39 }
        else if (key === 38) { key = (dir.current.current === 40) ? 40 : 38 }
        else if (key === 40) { key = (dir.current.current === 38) ? 38 : 40 }
        else {
            if (dir.current.next > 36 && dir.current.next < 41) {
                //pause
                dir.current.current = dir.current.next
                dir.current.next = 0
            } else {
                //unpause, press any key
                dir.current.next = dir.current.current
                dir.current.current = key
            }

            return
        }
        // edit this to stop at random key
        // dir.current.current = dir.current.next
        dir.current.next = key
    }

    const generateFood = () => {
        let y = Math.floor(Math.random() * sy / d)
        let x = Math.floor(Math.random() * sx / d)
        while (snake.some(snake => ((snake.x === x) && (snake.y === y)))) {
            y = Math.floor(Math.random() * sy / d)
            x = Math.floor(Math.random() * sx / d)
        }
        setFood({ x: 0, y: 0 })
        // setFood({ x: x, y: y })

    }

    useEffect(() => {
        const newY = Math.floor(Math.random() * sy / d)
        const newX = Math.floor(Math.random() * sx / d)

        setSnake([{ y: newY, x: newX }])
        generateFood()

        document.addEventListener("keydown", handleKeyDown)

        focusContainer.current.focus()
        const interval = setInterval(() => {
            setTime(time => time + 1);
        }, speed)
        return () => { console.log("iefw"); clearInterval(interval) }
    }, [])

    useEffect(() => {
        let newPos = { ...snake[snake.length - 1] }
        switch (dir.current.next) {
            case 37: newPos.x = (newPos.x - 1 < 0) ? (sx / d - 1) : (newPos.x - 1); break; //left
            case 39: newPos.x = (newPos.x + 1 > sx / d - 1) ? (0) : (newPos.x + 1); break; //right
            case 40: newPos.y = (newPos.y + 1 > sy / d - 1) ? (0) : (newPos.y + 1); break; //down
            case 38: newPos.y = (newPos.y - 1 < 0) ? (sy / d - 1) : (newPos.y - 1); break; //up
            default: return;
        }
        dir.current.current = dir.current.next
        let posArray = [...snake]
        posArray.push(newPos)
        if (snake[snake.length - 1].x === food.x && snake[snake.length - 1].y === food.y) {
            generateFood()
        } else {
            posArray.shift()
        }
        setSnake(posArray)

        console.log(sizeContainer)
    }, [time])

    return (
        <div ref={sizeContainer} className="flex h-full  relative items-center justify-center">

            {/*outline with gradient*/ }
            <div tabIndex={-2} className="bg-gradient-to-tr from-blue-500 via-purple-600 to-red-600 absolute outline-none" style={{ width: size.x + 2, height: size.y + 2 }}>
            </div>
            

            <div ref={focusContainer} tabIndex={-1} className="bg-custom-900 absolute outline-none" style={{ width: size.x, height: size.y }}>
            <div style={{ width:sx, height:sy }} className="absolute flex flex-col ">
                { (new Array(sy/d)).fill(0).map( (ting,i) => <div className={`${ (i===(sy/d)-1)?"":"border-b"} opacity-50 border-slate-700 relative t-30`} key={i} style={{ width: sx, height: d }}></div> ) }
            </div>
            <div style={{ width:sx, height:sy }} className="absolute flex flex-row ">
                { (new Array(sx/d)).fill(0).map( (ting,i) => <div className={`${ (i===(sx/d)-1)?"":"border-r"} opacity-50 border-slate-700 relative t-30`} key={i} style={{ width: d, height: sy }}></div> ) }
            </div>

                <Food position={food}></Food>
                <Snake positions={snake}></Snake>

                {(!dir.current.next) && <Pause width={size.x} height={size.y}></Pause>}

                {/* just the border */}
                {/* <div zindex={2} className="bg-transparent border absolute border-blue-500" style={{ width: size.x, height: size.y, top: 0, left: 0 }}></div> */}

                {/* {arena.map((row, y) => {
                    return row.map((col, x) => { let id = 10 * y + x; return <Block value={col} d={size.divisor} id={id} key={id}></Block> }) })
                } */}
                {/* </div> */}
            </div>

            

        </div>

    );
}

const Food = ({ position }) => {
    // type of food?
    return (
        <>
            {(position.x === -1) ? <></> : <div zindex={-1} className="outline-none bg-red-700 relative" style={{ width: d, height: d, top: position.y * d, left: position.x * d }}></div>}
        </>
    )
}

const Snake = ({ positions }) => {
    return (
        <>
            {positions.map((pos, i) => {
                return <div zindex={1} /*tabIndex={3}*/ key={i} className="snake outline-none bg-green-600 absolute" style={{ width: d, height: d, top: pos.y * d, left: pos.x * d }}></div>
            })}
        </>
    )
}

export default Game;
