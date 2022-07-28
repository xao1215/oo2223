const Pause = ({width,height}) => {
    return (
        <div className="flex justify-center items-center absolute top-0 left-0" style={{width:width, height:height}}>
            <div zindex={3} className="outline-none flex flex-col items-center justify-center bg-custom-100 opacity-80" style={{ width: width, height: height }}>
                <p className="text-5xl font-thin mb-3">Paused</p>
                <p className="font-thin">press any key to continue</p>
                </div>
        </div>
    )
}
export default Pause;