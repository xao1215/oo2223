import { useEffect, useState, useRef } from 'react';
import data from './data.js' 

const getRandomWords = () => {
    let small = (new Array(1560)).fill(0).map( (_,i) => i )
    let big = (new Array(data.length - 1560)).fill(0).map( (_,i) => i + 1560 )
    let result = []

    let howMany = 250
    while( howMany-- ){
        if( Math.random() > 0.3 ){
            console.log("kek")
            let which = Math.floor(Math.random() * small.length)
            result.push( data[ small[which] ] )
            result.push(" ")
            small.splice(which,1)
        }else{
            let which = Math.floor(Math.random() * big.length)
            result.push( data[ big[which] ] )
            result.push(" ")
            big.splice(which,1)
        }
    }
    console.log(result)

    // console.log(result)
    return result
}

const isSpace = (word) => {
    return ((word === " ") ? <>&nbsp;</> : word)
}

const TypeRacer = () => {
    const [words, setWords] = useState([])
    const [input, setInput] = useState("")
    const which = useRef({word:0,char:0})
    const [current, setCurrent] = useState("")

    const focus = useRef(null)

    useEffect(()=>{
        let data = getRandomWords() 
        setWords( data )
        setCurrent( data[0] )
    },[])

    const handleInput = (e) => {
        let newInput = e.target.value

        setInput(newInput)

        let right = 0
        for(let i = 0; i < newInput.length; i++){
            if(! (newInput.charAt(i) === current.charAt(i)) ){
                break;
            }
            right += 1
        }

        if(current.length === right){
            which.current.word += 1
            which.current.char = 0
            setCurrent( words[which.current.word] )
            setInput("")
        }else{
            which.current.char = right
        }
    }

    const focusInput = () => {
        focus.current.focus()
    }

    // option to see stats once you start, reset button, try query random api, usecontext for navbar routes

    return (
        <div className="flex h-full w-full items-center justify-center">
            {/*outline with gradient*/}
            <div onClick={ () => focusInput() } className="bg-slate-400 h-5/6 w-5/6 items-center justify-center flex " >

                <div  className="flex h-5/6 w-4/5 overflow-hidden bg-slate-100 text-black">

                    <div className="bg-slate-300 text-3xl w-1/2 leading-normal items-center flex justify-end">
                        <div className="absolute whitespace-nowrap">
                            {words.slice(0,which.current.word).map( w => isSpace(w) ) }
                            { [...input].map( (w,i) => <div className={`inline-block ${ i < which.current.char ? "bg-green-500" : "bg-red-400"} text-transparent`}>{isSpace(w)}</div>)} 
                        </div>
                        <input ref={focus} autoFocus={true} value={input} onChange={handleInput} spellCheck="false" className="text-right caret-black absolute whitespace-nowrap m-0 right-1/2 bg-transparent outline-none ">
                        </input>
                    </div>

                    <div className="bg-slate-300 text-3xl w-1/2 items-center leading-normal flex justify-start">
                        <div className=" w-1/2 overflow-hidden absolute  whitespace-nowrap">
                            { [...(current.slice(which.current.char,current.length))].map( char => isSpace(char)) }{words.map( (w,i) => ( i > which.current.word ) ? (isSpace(w)) : "" )}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TypeRacer