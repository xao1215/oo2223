import { useEffect, useState } from 'react';
import data from './data.js' 

const getRandomWords = () => {
    let arr = (new Array(data.length)).fill(0).map( (el,i) => i )
    let result = []

    let howMany = 250
    while( howMany-- ){
        let which = Math.floor(Math.random() * (data.length - result.length))
        result.push( data[ arr[which] ] )
        arr.slice(which,1)
    }

    console.log(result)
    return result
}

const TypeRacer = () => {
    const [words, setWords] = useState([])
    const [input, setInput] = useState("omg")

    useEffect(()=>{
        setWords( getRandomWords() )
    },[])

    const handleInput = (e) => {
        console.log(input)
        setInput( i => i + e.target.value)
    }

    return (
        <div className="flex h-full w-full relative items-center justify-center">
            {/*outline with gradient*/}
            <div className="bg-slate-400 h-5/6 w-5/6 items-center justify-center flex " >
                <div  onClick={()=>{setWords(getRandomWords())}} className="flex h-5/6 w-5/6 overflow-hidden bg-slate-100 text-black">

                    <div className="bg-amber-800 w-1/2 items-center flex justify-end">
                        <div className="absolute whitespace-nowrap">{input}</div>
                    </div>
                    <div className="bg-purple-800 w-1/2 items-center flex justify-start">
                        {/* for overflow control set parent to relative */}

                        <div className="absolute w-1/2 overflow-hidden whitespace-nowrap">{words}</div>
                        <input value={"___"} onChange={handleInput} spellCheck="false" className="absolute m-0 p-0 bg-transparent outline-none ">
                        </input>
                    </div>

                    {/* <p className="whitespace-nowrap h-100 w-100">
                    {words.map( word => word + " ")}
                    </p> */}
                    
                </div>
            </div>
        </div>
    )
}

export default TypeRacer