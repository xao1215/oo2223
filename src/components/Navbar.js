import Dropdown from './Dropdown'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { HiMoon } from 'react-icons/hi'
import { GiSun } from 'react-icons/gi'

const Navbar = () => {
    const [theme, setTheme] = useState(true)

    useEffect(()=>{
        document.documentElement.classList.add("dark")
    },[])

    useEffect(()=>{
        if(theme){
            document.documentElement.classList.add("dark")
        }else{
            document.documentElement.classList.remove("dark")
        }
    },[theme])

    return (

        <nav style={{ zIndex: 3333 }} className="relative flex justify-end md:justify-center gap-0 w-full bg-slate-300 dark:bg-custom-900">

            <div className="content-center m-0 col-span-10 justify-center hidden md:flex" id="navbar-default">
                <ul className="flex flex-row mt-0 text-md text-gray-900 dark:text-gray-300 ">

                    <li className="self-center transition duration-300 ease-in-out hover:bg-opacity-25 hover:bg-slate-600 ">
                        <NavLink to="/" style={{ fontFamily: "Bebas Neue" }} className={`block   tracking-wider ${(useLocation().pathname === "/") ? "text-amber-500" : ""} hover:text-amber-500`}>
                            <p className="px-8 pt-5 pb-4 drop-shadow-custom transition duration-300 ease-in-out text-3xl hover:scale-110 ">Snake</p>
                        </NavLink>
                    </li>

                    <li className="self-center transition duration-300 ease-in-out hover:bg-opacity-25 hover:bg-slate-600">
                        <NavLink to="/gameoflife" style={{ fontFamily: "Bebas Neue" }} className={`block tracking-wider ${(useLocation().pathname === "/gameoflife") ? "text-lime-500" : ""} hover:text-lime-500`}>
                            <div className="px-8 pt-5 pb-4 drop-shadow-custom transition duration-300 text-3xl ease-in-out hover:scale-110 ">Game Of Life</div>
                        </NavLink>
                    </li>

                    <li className="self-center transition duration-300 ease-in-out hover:bg-opacity-25 hover:bg-slate-600">
                        <NavLink to="/typeracer" style={{ fontFamily: "Bebas Neue" }} className={`block   tracking-wider ${(useLocation().pathname === "/typeracer") ? "text-pink-600" : ""} hover:text-pink-600`}>
                            <p className="px-8 pt-5 pb-4 drop-shadow-custom transition duration-300 ease-in-out text-3xl hover:scale-110 ">TypeRacer</p>
                        </NavLink>
                    </li>

                </ul>
            </div>

            <div className="md:pr-3 rounded-full relative md:absolute self-center flex md:right-0 right-auto">
                <button onClick={()=>{ setTheme(t => !t) }} id="theme" className="outline-none relative p-3 opacity-90 hover:bg-slate-400 dark:hover:opacity-100 dark:hover:bg-custom-800 rounded-full">
                        <div className="p-px border-2 dark:text-neutral-50 dark:border-neutral-50 text-neutral-900 border-neutral-900 rounded-full">
                            { theme ? <GiSun className="h-4 w-4 rounded-full"/> : <HiMoon className="h-4 w-4 rounded-full"/> }
                        </div>
                </button>
            </div>

            <Dropdown></Dropdown>

        </nav>
    );
}

export default Navbar;

