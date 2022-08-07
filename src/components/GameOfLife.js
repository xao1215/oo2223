import { useEffect, useRef, useState } from "react"

const pixelSize = 10

const GameOfLife = () => {


    //if size smaller than something then dont run
    const sizeContainer = useRef(null)

    const [size, setSize] = useState({ width: 0, height: 0 })

    const [run, setRun] = useState(false)
    const [grid, setGrid] = useState(null)

    const lifeCycle = () => {
        if (!run) return



        setTimeout(() => {
            lifeCycle()
        }, 250)
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
        setRun(false)

        // check if size !== 0 TODO
        setGrid(Array(size.height / pixelSize).fill(Array(size.width / pixelSize).fill(0)))
        console.log(size.width, grid)
    }, [size])

    console.log(grid)

    return (
        <div ref={sizeContainer} className="flex h-full w-full relative items-center justify-center">

            {/*outline with gradient*/}
            <div style={{ width: size.width + 5, height: size.height + 5 }} className="items-center justify-center bg-gradient-to-br from-amber-300 via-teal-300 to-indigo-500">
                <div style={{ width: size.width, height: size.height, left: 2.5, top: 2.5 }} className="relative flex content-start flex-wrap">
                    {(grid != null) && grid.map((row, i) => row.map((item, j) =>
                        <div style={{ height: pixelSize, width: pixelSize }} id={10 * i + j} key={10 * i + j} className="item bg-custom-900"></div>
                    ))}

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