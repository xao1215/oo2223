const TypeRacer = () => {

    return (
        <div className="flex h-full w-full relative items-center justify-center">

            {/*outline with gradient*/}
            <div className="bg-red-500 h-5/6 w-5/6 items-center justify-center flex " >
                <div className="h-1/2 bg-slate-100  w-1/2">
                    
                    {/*two input/ div one on top of another and you  type on top so the top doesnt move, the bottom does*/ }
                    <p className="absolute text-black">_</p>
                    <input spellCheck="false" className="absolute m-0 p-0 bg-transparent outline-none text-black">
                    </input>
                </div>
            </div>

        </div>
    )
}

export default TypeRacer