import { useEffect, useRef, useState } from "react"

const pixelSize = 20
const speed = 100

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

    //if size smaller than something then dont run
    const sizeContainer = useRef(null)

    const [size, setSize] = useState({ width: 0, height: 0 })

    // const [run, setRun] = useState(false)
    const run = useRef(false)

    const [grid, setGrid] = useState(null)

    const lifeCycle = () => {
        if (!run.current) return

        // console.log( Array(10).fill(),Array(10) )
        setGrid( old => {
            let omg = [...old]
            for(let i = 0; i < omg.length; i++){
                for(let j = 0; j < omg[0].length; j++){
                    
                    let count = 0
                    neighbours.forEach( ([y,x]) => {
                        count += ( i+y >= 0 && i+y < omg.length && j+x >= 0 && j+x < omg[0].length ) ? ((old[i+y][j+x] === 1) ? 1 : 0) : 0
                    })

                    if(old[i][j] === 1){
                        if(!(count === 2 || count === 3)){omg[i][j] = 0}
                    }else{
                        if(count === 3){omg[i][j] = 1}
                    }

                }
            }
            // console.log(omg)
            return omg
        })
        // console.log("omg")

        setTimeout(() => {
            lifeCycle()
        }, speed)
    }

    const randomize = () => {
        run.current = false
        setGrid(Array(size.height / pixelSize).fill().map(_ => Array(size.width / pixelSize).fill().map(_ => Math.floor(Math.random() * 2))))
    }

    const handleResize = (e) => {
        // console.log(sizeContainer.current.getBoundingClientRect())
        const { width: w, height: h } = sizeContainer.current.getBoundingClientRect()
        setSize({ width: w - w % pixelSize - 80, height: h - h % pixelSize - 80 })
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        run.current = false

        // check if size !== 0 TODO
        setGrid(Array(size.height / pixelSize).fill(Array(size.width / pixelSize).fill(0)))
    }, [size])
    console.log("rerender")

    return (
        <div ref={sizeContainer} className="flex h-full w-full relative items-center justify-center">

            {/*outline with gradient*/}
            <div style={{ width: size.width + 4, height: size.height + 4 }} className="relative items-center justify-center bg-gradient-to-br from-amber-300 via-teal-300 to-indigo-500">

                <div style={{ width: size.width, height: size.height, left: 2, top: 2 }} className="absolute flex content-start flex-wrap bg-custom-900">

                    {/* controls */}
                    <div className="absolute right-0 origin-top-right transition duration-300  hover:scale-150">
                        <button className="relative opacity-50 active bg-gray-600 right-0" onClick={() => { randomize() }}>Randomize</button>
                        <button className="  opacity-50 relative active bg-gray-600 right-0" onClick={() => { run.current = !run.current; lifeCycle() }}>Run</button>
                    </div>

                    {(grid != null) && grid.map((row, i) => row.map((num, j) => {
                        return <div
                                style={{ height: pixelSize, width: pixelSize }}
                                id={10 * i + j} key={10 * i + j}
                                className={(num === 0) ? "bg-custom-900" : "bg-slate-200"} >
                            </div>
                    }))}

                </div>
                {/* <div style={{ width:"calc(100% - 5px)", height:"calc(100% - 20)"}} className="block  bg-custom-900"> */}
                {/* <div className={` grid grid-rows-2 grid-cols-2 grid-flow-row`}>
                        <div className="bg-custom-900" style={{width:100,height:100}}></div>
                        <div style={{width:100,height:100}}></div>
                        <div style={{width:100,height:100}}></div>
                        <div style={{width:100,height:100}}></div>

                    </div> */}

                {/* </div> */}
            </div>



        </div>
    )
}


export default GameOfLife