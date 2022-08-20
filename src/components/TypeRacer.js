import { useEffect, useState, useRef } from 'react';
import data from './data.js' 

const getRandomWords = () => {
    let arr = (new Array(data.length)).fill(0).map( (el,i) => i )
    let result = []

    let howMany = 250
    while( howMany-- ){
        let which = Math.floor(Math.random() * (data.length - result.length))
        result.push( data[ arr[which] ] )
        result.push(" ")
        arr.slice(which,1)
    }

    // console.log(result)
    return result
}

const isSpace = (word) => {
    return ((word === " ") ? <>&nbsp;</> : word)
}

const TypeRacer = () => {
    const [words, setWords] = useState([])
    const [done, setDone] = useState([])
    const [input, setInput] = useState("")
    const which = useRef(0)
    const [current, setCurrent] = useState("")

    const focus = useRef(null)

    useEffect(()=>{
        let data = getRandomWords() 
        setWords( data )
        setCurrent( data[0] )
    },[])

    const handleInput = (e) => {
        console.log(e.target.value)

        // if valid
        setInput(e.target.value)
        setDone(e.target.value)

        if(e.target.value.charAt( e.target.value.length-1 ) === current.charAt(0)){   //if right char
            if( current.length === 1 ){    //if end of char
                which.current = which.current + 1
                setCurrent( words[which.current] )
                setInput("")
                // setDone( d => {
                //     let n = structuredClone(d)
                //     n.push("omg")
                //     return n
                // })
            }else{    // if not end
                setCurrent( c => c.slice(1)) 
                // setWords( prev => {
                //     let temp = structuredClone(prev)    
                //     temp[0] = prev[0].slice(1)
                //     return temp
                // } )
            }
        }
        // setInput( e.target.value )
    }

    const kek = (word) => {
        let omg = [...word]
        return ((word === " ") ? <>&nbsp;</> : word)
    }



    return (
        <div className="flex h-full w-full items-center justify-center">
            {/*outline with gradient*/}
            <div className="bg-slate-400 h-5/6 w-5/6 items-center justify-center flex " >
                <div  onClick={()=>{console.log(which.current);console.log(current);console.log(words)}} className="flex h-5/6 w-4/5 overflow-hidden bg-slate-100 text-black">

                    <div className="bg-slate-300 text-3xl w-1/2 items-center flex justify-end">
                        <div className="absolute whitespace-nowrap">
                            {words.slice(0,which.current).map( w => isSpace(w) ) } { [...input].map( w => isSpace(w))}
                        </div>
                        <input autoFocus={true} value={input} onChange={handleInput} spellCheck="false" className="text-right absolute whitespace-nowrap m-0 p-0 right-1/2 bg-transparent outline-none ">
                            </input>
                    </div>
                    <div className="bg-slate-500 text-3xl w-1/2 items-center flex justify-start">
                        {/* for overflow control set parent to relative */}

                        <div className=" w-1/2 overflow-hidden absolute  whitespace-nowrap">
                            { isSpace(current) }{words.map( (w,i) => ( i > which.current ) ? (isSpace(w)) : "" )}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TypeRacer