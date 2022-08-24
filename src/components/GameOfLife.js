import { useEffect, useRef, useState, useCallback, memo } from "react"
import { HiOutlineRefresh } from "react-icons/hi"
import { MdOutlineClear, MdPlayArrow, MdPause } from "react-icons/md"
import { Transition } from "@headlessui/react"

const pixelSize = 15
const paddingx = 360
const paddingy = 75
const speed = 150
const neighbours = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1],
]

const GameOfLife = () => {
    console.log("render")

    //if size smaller than something then dont run
    const sizeContainer = useRef(null)

    const [size, setSize] = useState({ width: 360, height: 360 })

    const [run, setRun] = useState(false)
    const runref = useRef(false)
    const draw = useRef(false)

    const [grid, setGrid] = useState(null)

    const lifeCycle = () => {
        if (!runref.current) return
        setGrid( old => {

            let omg = structuredClone(old)
            for(let i = 0; i < omg.length; i++){
                for(let j = 0; j < omg[0].length; j++){
                    
                    let count = 0

                    // no wrapping
                    // neighbours.forEach( ([y,x]) => {
                    //     count += ( i+y >= 0 && i+y < omg.length && j+x >= 0 && j+x < omg[0].length ) ? ((old[i+y][j+x] === 1) ? 1 : 0) : 0
                    // })
                    
                    neighbours.forEach( ([y,x]) => {
                        count += (old[(i+y+old.length)%old.length][(j+x+old[0].length)%old[0].length] === 1) ? 1 : 0
                    })

                    if(old[i][j] === 1){
                        if(!(count === 2 || count === 3)){omg[i][j] = 0}
                    }else{
                        if(count === 3){omg[i][j] = 1}
                    }

                }
            }

            return omg
        })

        setTimeout(lifeCycle,speed)
    }

    const randomize = () => {
        setRun(false)
        runref.current = false
        setGrid(Array(size.height / pixelSize).fill().map(_ => Array(size.width / pixelSize).fill().map(_ => Math.floor(Math.random() * 1.6))))
    }

    const handleResize = (e) => {
        const { width: w, height: h } = sizeContainer.current.getBoundingClientRect()
        setSize({ width: w - w % pixelSize - paddingx, height: h - h % pixelSize - paddingy })
    }

    const handleMouse = () => {
        draw.current = !draw.current
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        window.addEventListener("mousedown", handleMouse)
        window.addEventListener("mouseup", handleMouse)

        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousedown", handleMouse)
            window.removeEventListener("mouseup", handleMouse)
        }
    }, [])

    useEffect(() => {
        setRun(false)
        runref.current = false

        // check if size !== 0 TODO
        setGrid(Array(size.height / pixelSize).fill().map(_ => Array(size.width / pixelSize).fill().map(_ => 0)))
        // setGrid(Array(size.height / pixelSize).fill(Array(size.width / pixelSize).fill(0)))
    }, [size])


    const mouseOverGrid = useCallback((y,x) => {
        if(draw.current){
            setGrid(prev=>{
                let nju = structuredClone(prev)
                nju[y][x] = Math.abs(nju[y][x] - 1)
                return nju 
            })
        }
    },[])

    const mouseClickGrid = useCallback((y,x) => {
        setGrid(prev=>{
            let nju = structuredClone(prev)
            nju[y][x] = Math.abs(nju[y][x] - 1)
            return nju 
        })
    },[])

    if(size.width < 400){
        return <div ref={sizeContainer} className="flex h-full w-full relative items-center justify-center"></div>
    }

    return (
        <div ref={sizeContainer} className="flex h-full w-full relative items-center justify-center">

            <div style={{ width: size.width + 3, height: size.height + 3 }} className="relative items-center justify-center bg-gradient-to-br from-amber-300 via-emerald-500 to-green-300">

                <div style={{ width: size.width, height: size.height, left: 1.5, top: 1.5 }} className="absolute flex content-start flex-wrap bg-custom-900">

                    {/* controls */}
                    <div className="absolute pl-2.5 pb-2.5 right-0 flex flex-col xs:flex-row origin-top-right transition delay-700 hover:delay-0 duration-150 hover:scale-150">
                        {/* <button className="relative px-2 py-1 opacity-40 hover:opacity-80 bg-gray-600" onClick={() => { draw.current = !draw.current }}>Draw</button> */}
                        
                        <button className="relative px-2 py-1 opacity-40 hover:opacity-90 bg-gray-600" onClick={() => { randomize() }}>
                            <HiOutlineRefresh className="scale-90 h-5 w-5"/>
                        </button>
                        
                        <button className="relative px-2 py-1 opacity-40 hover:opacity-90 text-white bg-gray-600" onClick={() => { setRun(run => !run); runref.current = !runref.current; lifeCycle() }}>
                            <span className="block h-5 w-5">
                                <Transition className="absolute"
                                    show={run}
                                    enter="transition duration-500"
                                    enterFrom="transform opacity-0 scale-0"
                                    enterTo="transform  opacity-100 scale-100"
                                    leave={`transition ease-in duration-500`}
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-0"
                                >
                                    <MdPause className="h-5 w-5" />
                                </Transition>
                                <Transition className="absolute"
                                    show={!run}
                                    enter="transition duration-500"
                                    enterFrom="transform opacity-0 scale-0"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-500"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-0"
                                >
                                    <MdPlayArrow className="h-5 w-5" />
                                </Transition>
                            </span>
                        </button>
                        
                        <button className="relative px-2 py-1 opacity-40 hover:opacity-90 bg-gray-600" onClick={() => { setGrid(Array(size.height / pixelSize).fill().map(_ => Array(size.width / pixelSize).fill().map(_ => 0))) }}>
                            <MdOutlineClear className="h-5 w-5"/>
                        </button>
                    </div>

                    {(grid != null) && grid.map((row, i) => row.map((num, j) => {
                        return <Pixel key={10*i+j} i={i} j={j} num={num} omo={mouseOverGrid} omc={mouseClickGrid} />
                    }))}

                </div>
            </div>
        </div>
    )
}

const Pixel = memo(({i,j,num,omo,omc}) => {
    return <button
        style={{ height: pixelSize, width: pixelSize }}
        className={` ${(num === 0) ? "bg-custom-900" : "bg-slate-200"} hover:bg-neutral-500 `}
        onClick={() => {
            omc(i,j)
        }}
        onMouseOver={() => {
            omo(i,j)
        }}
    >
    </button>
})


export default GameOfLife