import { useEffect, useState, useRef } from 'react';
import { QueryClient, useQuery } from "@tanstack/react-query"
import data from './data.js' 

const getRandomWords = () => {
    let small = (new Array(884)).fill(0).map( (_,i) => i )
    // let mid = (new Array(676)).fill(0).map( (_,i) => i + 884 ) //5
    let big = (new Array(data.length - 884)).fill(0).map( (_,i) => i + 884 )
    let result = []

    let howMany = 250
    while( howMany-- ){
        if( Math.random() > 0.25 ){
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
    return result
}

const isSpace = (word, i, opacity) => {
    opacity = opacity < 10 ? 10 : opacity
    const style = "inline-block"   

    return ( <div style={{opacity:opacity/100}} key={i} className={style}> { word === " " ? <>&nbsp;</> : word } </div> )
}

async function fetchShit() {
    const res = await fetch("https://random-word-api.herokuapp.com/word")
    return res.json()
}

const TypeRacer = () => {
    const { data, status, error } = useQuery(["shit"], () => fetchShit())

    const [words, setWords] = useState([])
    const [input, setInput] = useState("")
    const which = useRef({word:0,char:0})
    const [current, setCurrent] = useState("")

    const focus = useRef(null)

    useEffect(()=>{
        let rand = getRandomWords() 
        setWords( rand )
        setCurrent( rand[0] )
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
    //two INPUTS IN THE BACK???

    console.log(data,status)
    return (
        <div className="flex flex-col gap-10 h-full w-full items-center justify-center">

            <div onClick={ () => focusInput() } className="text-5xl tracking-wide font-thin text-white bg-custom-900 shadow-2xl h-36 w-full items-center justify-center flex " >

                <div  className="flex overflow-hidden">

                    <div className="w-1/2 leading-normal items-center flex justify-end">
                        <div className="absolute whitespace-nowrap">

                            {words.slice(0,which.current.word).map( (w,i) => isSpace(w,i,10) ) }
                            { [...input].map( (w,i) => <div key={i} className={`text-transparent inline-block ${ i < which.current.char ? "bg-green-500" : "bg-red-500"}`}>{isSpace(w,i,100)}</div>)}

                        </div>
                        <input onKeyDown={ (e) => /^[^a-z\s]+$/.test(e.key) && e.preventDefault() } ref={focus} autoFocus={true} value={input} onChange={handleInput} spellCheck="false" className="text-right w-full absolute tracking-wide whitespace-nowrap m-0 right-1/2 bg-transparent outline-none text-white ">
                        </input>
                    </div>

                    <div className="w-1/2 items-center leading-normal flex justify-start">
                        <div className=" w-1/2 overflow-hidden absolute whitespace-nowrap">

                            { [...(current.slice(which.current.char,current.length))].map( (char,i) => isSpace(char,i,100)) }
                            {words.map( (w,i) => ( i > which.current.word ) ? (isSpace(w,i,100-(i-which.current.word)*5)) : "" )}

                        </div>
                    </div>
                    {/* <div className="absolute w-96 h-1/2 bg-red-500"></div> */}
                    
                </div>

            </div>

            <div className="pt-12 pb-14 w-full shadow-xl align-middle text-5xl whitespace-nowrap font-thin bg-custom-900 text-white items-center justify-center overflow-hidden flex">
                wpm cpm time-left restart hide/show {status}
            </div>

        </div>
    )
}

export default TypeRacer