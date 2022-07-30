import React from "react"

const Pause = React.memo(({ score }) => {
    return (
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full" >
            <div zindex={3} className="outline-none h-full w-full flex flex-col items-center justify-center bg-custom-100 opacity-80" style={{  }}>
                <p className="text-5xl font-thin mb-3">Paused</p>
                <p className="text-7xl font-thin mb-3">Score: {score}</p>

                <p className="font-thin">press any key to continue</p>
                </div>
        </div>
    )
})
export default Pause;