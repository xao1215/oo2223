import Dropdown from './Dropdown'
import { CubeIcon } from "@heroicons/react/solid"

const Navbar = () => {
    return (

        <nav style={{ zIndex: 3333 }} className="relative flex justify-end sm:grid sm:grid-cols-6  bg-white w-full border-b border-purple-600 px-8 py-3   dark:bg-custom-900">

            <div className="self-center"></div>

            <div className="content-center col-span-4 justify-center hidden sm:flex" id="navbar-default">
                <ul className="flex bg-gray-50 flex-row mt-0 text-md dark:bg-custom-900 ">
                    <li className="self-center">
                        <a href="/" className="block pr-5 border-r border-gray-600 text-blue-500 hover:text-blue-700" aria-current="page">Snake</a>
                    </li>
                    <li className="self-center">
                        <a href="/gameoflife" className="block px-5 border-r border-gray-600 text-gray-400 hover:text-gray-100  ">Game Of LIfe</a>
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
                    <li className="self-center">
                        <a href="/tetris" className="block pl-5 text-gray-400 hover:text-gray-100  ">Tetris</a>
                    </li>
                </ul>
            </div>
            <div className="self-center"></div>
            <Dropdown></Dropdown>


        </nav>
    );

}

export default Navbar;

