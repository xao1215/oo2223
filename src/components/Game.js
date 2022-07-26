import React, { useState, useEffect, useRef } from 'react';
const sx = 720
const sy = 520
const d = 40
const speed = 90
// const arrlen = s/d

function Game() {

    // const [arena, setArena] = useState(Array((s/d)).fill(0).map(row => { return Array(s/d).fill(0) }))
    const [size, setSize] = useState({ x: sx, y: sy, divisor: d })

    const [snake, setSnake] = useState([{ x: 0, y: 0 }])
    const dir = useRef({ current: 1, next: 1 })

    const [food, setFood] = useState({ x: -1, y: -1 })
    // const [valid, setValid] = useState( [...Array((s/d)*(s/d)).keys()] )


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
                dir.current.current = dir.current.next
                dir.current.next = key
            } else {
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
        // console.log(valid.filter( num => num > -1 ))
        setFood({ x: x, y: y })
    }

    useEffect(() => {
        //every time position changes, update arena
        // setArena(arena => [...arena].map( (row,i) => row.map( (element,j) => {
        //     console.log(i,j)
        //     return 0;
        // })))
        const newY = Math.floor(Math.random() * sy / d)
        const newX = Math.floor(Math.random() * sx / d)

        setSnake([{ y: newY, x: newX }])
        // setValid( valid => {valid[newY * 10 + newX] = -1; return valid})
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
        // let arenaCopy = [...arena]
        posArray.push(newPos)
        // document.addEventListener(handleKeyDown)
        if (snake[snake.length - 1].x === food.x && snake[snake.length - 1].y === food.y) {
            // setValid( valid => {valid[food.y * 10 + food.x] = -1; return valid})
            generateFood()
        } else {
            // setValid( valid => {valid[snake[0].y * 10 + snake[0].x] = -1; return valid})

            posArray.shift()

        }
        setSnake(posArray)

        console.log(sizeContainer)
        // generateFood()
        // let newRows = Array((s/d)).fill(0).map(row => { return Array(s/d).fill(0) })
        // position.forEach(element => newRows[element.y][element.x] = 1)

        // setArena(newRows)
        // setArena(arenaCopy)
        // console.log(position)
        // console.log(arena)
    }, [time])

    return (
        <div ref={sizeContainer} className="flex h-full  items-center justify-center">

            <div ref={focusContainer} tabIndex={-1} className="bg-custom-900 relative outline-none" style={{ width: size.x, height: size.y }}>
                {/* <div className="flex flex-wrap"> */}
                <Food position={food}></Food>
                <Snake positions={snake}></Snake>
                <div zindex={2} className="bg-transparent border absolute border-blue-500" style={{ width: size.x, height: size.y, top: 0, left: 0 }}></div>

                {/* {arena.map((row, y) => {
                    return row.map((col, x) => { let id = 10 * y + x; return <Block value={col} d={size.divisor} id={id} key={id}></Block> }) })
                } */}
                {/* </div> */}
            </div>
        </div>

    );
}

// const Block = memo(({value,d,id}) => {
//     return (
//         <div id={id} className="flex items-center justify-center bg-neutral-200 border border-slate-400" style={{ width: d, height: d }}>
//             <div className={`h-3/4 w-3/4 ${value===0?"bg-neutral-100":"bg-blue-700"} rounded-sm drop-shadow-lg`}>
//             </div>
//         </div>
//     );
// })


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
                return <div zindex={3} /*tabIndex={3}*/ key={i} className="outline-none bg-green-600 absolute" style={{ width: d, height: d, top: pos.y * d, left: pos.x * d }}></div>
            })}
        </>
    )
}

export default Game;
