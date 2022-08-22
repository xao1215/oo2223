import Dropdown from './Dropdown'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { HiMoon } from 'react-icons/hi'
import { GiSun } from 'react-icons/gi'
// import { CubeIcon } from "@heroicons/react/solid"

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

    // bg-slate-400  + bg-slate-100 FOR LIGHT THEME PRIMARY?

    return (

        <nav style={{ zIndex: 3333 }} className="relative flex justify-end sm:justify-center gap-0 w-full bg-neutral-50 dark:bg-custom-900">

            {/* <div className="self-center"></div> */}

            <div className="content-center m-0 col-span-10 justify-center hidden sm:flex" id="navbar-default">
                <ul className="flex flex-row mt-0 text-md text-gray-900 dark:text-gray-300 ">

                    <li className="self-center transition duration-300 ease-in-out hover:bg-opacity-25 hover:bg-rose-500 ">
                        <NavLink to="/" style={{ fontFamily: "Bebas Neue" }} className={`block   tracking-wider ${(useLocation().pathname === "/") ? "text-amber-500" : ""} hover:text-amber-500`}>
                            <p className="px-8 pt-5 pb-4 transition duration-500 ease-in-out text-2xl hover:scale-125 ">Snake</p>
                        </NavLink>
                    </li>

                    <li className="self-center transition duration-300 ease-in-out hover:bg-opacity-20 hover:bg-emerald-400">
                        <NavLink to="/gameoflife" style={{ fontFamily: "Bebas Neue" }} className={`block tracking-wider ${(useLocation().pathname === "/gameoflife") ? "text-lime-500" : ""} hover:text-lime-500`}>
                            <div className="px-8 pt-5 pb-4 transition duration-500 text-2xl ease-in-out hover:scale-125 ">Game Of Life</div>
                        </NavLink>
                    </li>

                    <li className="self-center transition duration-300 ease-in-out hover:bg-opacity-20 hover:bg-violet-500">
                        <NavLink to="/typeracer" style={{ fontFamily: "Bebas Neue" }} className={`block   tracking-wider ${(useLocation().pathname === "/typeracer") ? "text-pink-600" : ""} hover:text-pink-600`}>
                            <p className="px-8 pt-5 pb-4 transition duration-500 ease-in-out text-2xl hover:scale-125 ">TypeRacer</p>
                        </NavLink>
                    </li>

                    {/* <li>
                            <div className="relative inline-block">
                                <CubeIcon style={{ left:-1, top:-2}} className="absolute text-green-300 h-10 w-10"></CubeIcon>
                                <CubeIcon style={{ left:2, top:1}} className="h-10 w-10 text-purple-600 absolute"></CubeIcon>
                                <CubeIcon style={{ left:-2, top:1}} className="h-10 w-10 text-yellow-500 absolute"></CubeIcon>
                                <CubeIcon className="h-10 w-10 text-neutral-100 absolute "></CubeIcon>
                            </div>
                            <a href="/" className="inline-block px-5 border-r border-gray-600 text-gray-400 hover:text-gray-100  ">About</a>
                        </li> */}
                </ul>
            </div>

            <div className="sm:pr-3 rounded-full relative sm:absolute self-center flex sm:right-0 right-auto">
                <button onClick={()=>{ setTheme(t => !t) }} id="theme" className="outline-none relative p-3 opacity-90 hover:bg-neutral-200 dark:hover:opacity-100 dark:hover:bg-custom-800 rounded-full">
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

