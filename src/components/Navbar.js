import Dropdown from './Dropdown'
import { NavLink, useLocation } from 'react-router-dom'
import { Transition } from '@headlessui/react'

// import { CubeIcon } from "@heroicons/react/solid"

const Navbar = () => {
    return (

        <nav style={{ zIndex: 3333 }} className="relative flex justify-end sm:grid sm:grid-cols-12 gap-0  bg-white w-full    dark:bg-custom-900">

            <div className="self-center"></div>

            <div className="content-center m-0 col-span-10 justify-center hidden sm:flex" id="navbar-default">
                <ul className="flex bg-gray-50 flex-row mt-0 text-md dark:bg-custom-900 ">
                    <li className="self-center ">

                        <NavLink to="/" style={{ fontFamily: "Bebas Neue" }} className={`block   tracking-wider border-r border-gray-600 ${(useLocation().pathname === "/") ? "text-amber-500" : "text-gray-400"} hover:text-amber-500`}>
                            <p className="px-8 pt-5 pb-4 transition duration-700 ease-in-out text-2xl hover:bg-opacity-25   hover:scale-125 ">Snake</p>
                        </NavLink>

                    </li>
                    <li className="self-center">

                        <NavLink to="/gameoflife" style={{ fontFamily: "Bebas Neue" }} className={`block   tracking-wider border-r border-gray-600 ${(useLocation().pathname === "/gameoflife") ? "text-lime-500" : "text-gray-400"} hover:text-lime-500`}>
                            <div className="px-8 pt-5 pb-4  transition duration-700 text-2xl  ease-in-out hover:scale-125 ">Game Of Life</div>
                        </NavLink>

                    </li>
                    <li className="self-center">

                        <NavLink to="/tetris" style={{ fontFamily: "Bebas Neue" }} className={`block   tracking-wider border-r border-gray-600 ${(useLocation().pathname === "/tetris") ? "text-pink-600" : "text-gray-400"} hover:text-pink-600`}>
                            <p className="px-8 pt-5 pb-4 transition duration-700 ease-in-out text-2xl hover:scale-125 ">Tetris?</p>

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
            <div className="self-center"></div>
            <Dropdown></Dropdown>


        </nav>
    );

}

export default Navbar;

