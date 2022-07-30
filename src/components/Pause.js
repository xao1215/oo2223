import React from "react"

const Pause = React.memo(({ gameState, score }) => {
    return (
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full" >
            <div zindex={3} className="outline-none h-full w-full flex flex-col items-center justify-center bg-custom-100 opacity-80">
                <p className="text-5xl font-thin mb-3">{ (gameState >= 2) ? "Game Over" : "Paused" }</p>
                <p className="text-7xl font-thin mb-3">Score: { (gameState >= 2) ? gameState : score }</p>

                <p className="font-thin">{ (gameState === 1) ? "press any key to continue" : ((gameState === 2) ? "press any key to start again" : "use the arrow keys to move") }</p>
                </div>
        </div>
    )
})
export default Pause;