import React, { useEffect, useState, useRef, useCallback } from 'react';
import { QueryClient, useQuery } from "@tanstack/react-query"
import { HiOutlineRefresh } from "react-icons/hi"
import { IoMdEye, RiEyeCloseLine } from 'react-icons/io'
import data from './data.js'
import TypeRacerModal from './TypeRacerModal'

const getRandomWords = () => {
    let small = (new Array(884)).fill(0).map((_, i) => i)
    // let mid = (new Array(676)).fill(0).map( (_,i) => i + 884 ) //5
    let big = (new Array(data.length - 884)).fill(0).map((_, i) => i + 884)
    let result = []

    let howMany = 250
    while (howMany--) {
        if (Math.random() > 0.325) {
            let which = Math.floor(Math.random() * small.length)
            result.push(data[small[which]])
            result.push(" ")
            small.splice(which, 1)
        } else {
            let which = Math.floor(Math.random() * big.length)
            result.push(data[big[which]])
            result.push(" ")
            big.splice(which, 1)
        }
    }
    return result
}

const isSpace = (word, i, opacity) => {
    opacity = opacity < 10 ? 10 : opacity
    const style = "inline-block"
    return (<div style={{ opacity: opacity / 100 }} key={i} className={style}> {word === " " ? <>&nbsp;</> : word} </div>)
}

const space = (word) => {
    return (word === " " ? <>&nbsp;</> : word)
}

async function fetchStuff() {
    const res = await fetch("https://random-word-api.herokuapp.com/word")
    return res.json()
}

const TypeRacer = () => {
    // const { data, status, error } = useQuery(["shit"], () => fetchStuff())

    const [words, setWords] = useState([])
    const [input, setInput] = useState("")
    const which = useRef({ word: 0, char: 0 })
    const [current, setCurrent] = useState("")

    const focus = useRef(null)

    const [time, setTime] = useState(61)
    const run = useRef(false)

    const [show, setShow] = useState(true)

    const handleInput = (e) => {
        if (!run.current) {
            run.current = true
            timer()
        }

        let newInput = e.target.value

        setInput(newInput)

        let right = 0
        for (let i = 0; i < newInput.length; i++) {
            if (!(newInput.charAt(i) === current.charAt(i))) {
                break;
            }
            right += 1
        }

        if (current.length === right) {
            which.current.word += 1
            which.current.char = 0
            setCurrent(words[which.current.word])
            setInput("")
        } else {
            which.current.char = right
        }
    }

    const timer = () => {
        if (!run.current) return;

        setTime(t => t - 1)

        setTimeout(timer, 250)
    }

    const init = useCallback(() => {
        let rand = getRandomWords()
        setTime(61)
        setWords(rand)
        setCurrent(rand[0])
        setInput("")
        setShow(true)
        which.current = { word: 0, char: 0 }
        run.current = false
        // focus.current.focus()
    }, [])

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        console.log(time)
        if (time === 0) {
            focus.current.blur()
            run.current = false
        }
    }, [time])

    const wpm = which.current.word % 2 === 1 ? (which.current.word + 1) / 2 : which.current.word / 2
    const cpm = words.slice(0, which.current.word).reduce((prev, cur) => prev + ((cur === " ") ? 0 : cur.length), 0) + which.current.char

    const hide = useCallback(() => {
        setShow(t => !t)
    },[])

    return (
        <div className="flex flex-col gap-5 h-full w-full items-center justify-center">

            <TypeRacerModal show={time === 0} reset={init} data={time === 0 ? [wpm, cpm] : false} showOthers={setShow}/>

            <div onClick={() => focus.current.focus()} className="text-5xl font-thin text-white bg-custom-900 shadow-2xl h-8 sm:h-16 md:h-32 w-full items-center justify-center flex " >

                <div className="flex overflow-hidden">

                    <div className="w-1/2 leading-normal items-center flex justify-end">
                        <div className="absolute whitespace-nowrap">

                            {words.slice(0, which.current.word).map((w, i) => isSpace(w, i, 10))}
                            {/* { [...input].map( (w,i) => <div key={i} className={`text-green-500 inline-block ${ i < which.current.char ? "bg-green-500" : "bg-red-500"}`}>{isSpace(w,i,100)}</div>)} */}
                            <p className="inline-block text-transparent bg-green-500 ">{[...input].map((w, i) => i < which.current.char ? space(w) : "")}</p>
                            <p className="inline-block bg-red-500 text-transparent ">{[...input].map((w, i) => i >= which.current.char ? space(w) : "")}</p>

                        </div>
                        <input onKeyDown={(e) => /^[^a-z\s]+$/.test(e.key) && e.preventDefault()} ref={focus} autoFocus={true} value={input} onChange={handleInput} spellCheck="false" className="text-right w-full absolute  whitespace-nowrap m-0 right-1/2 bg-transparent outline-none text-white ">
                        </input>
                    </div>

                    <div className="w-1/2 items-center leading-normal flex justify-start">
                        <div className=" w-1/2 overflow-hidden absolute whitespace-nowrap">

                            {[...(current.slice(which.current.char, current.length))].map((char, i) => isSpace(char, i, 100))}
                            {words.map((w, i) => (i > which.current.word) ? (isSpace(w, i, 100 - (i - which.current.word) * 10)) : "")}

                        </div>
                    </div>
                    {/* <div className="absolute w-96 h-1/2 bg-red-500"></div> */}

                </div>

            </div>

            <div className="align-middle text-3xl font-thin text-white items-center justify-center flex flex-row gap-5">

                {[["wpm", wpm, show], ["cpm", cpm, show], ["time left", (time > 60 ? 60 : time), show], ["reset", "xd", init], ["hide", show, setShow]].map(el => <Element text={el[0]} data={el[1]} extra={el[2]}/>
                )}

            </div>

        </div>
    )
}

const Element = React.memo(({ text, data, extra }) => {
    return (
        <div className="w-36 h-44 pt-2 justify-center shadow-lg items-center rounded-md pb-7 bg-custom-900">
            <div className="block bg-purple-900 bg-opacity-0 w-full text-center pb-6">{text}</div>
            <div className="flex items-center justify-center text-center text-7xl h-20 text-violet-600 hover:text-rose-600">
                { (typeof(data) === 'string') && <button onClick={extra} className="h-20"><HiOutlineRefresh className="h-10 w-10"/></button> }
                { (typeof(data) === 'boolean') && <button onClick={() => extra(e => !e)}><IoMdEye className="h-10 w-10"/></button> }
                { typeof(data) === 'number' && (extra ? data : "-") }
            </div>
        </div>
    )
})

export default TypeRacer