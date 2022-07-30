import Dropdown from './Dropdown'
import { CubeIcon } from "@heroicons/react/solid"

const Navbar = () => {
    return (

        <nav style={{ zIndex: 3333 }} className="relative bg-white w-full border-b border-amber-500 px-8 py-1  dark:bg-custom-900">
            <div className="flex flex-wrap justify-between items-center mx-auto">

                <a href="https://flowbite.com/" className="flex items-center">
                    <img src="/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
                    <span className="self-center text-xl p-4 font-semibold whitespace-nowrap dark:text-white">Something</span>
                </a>

                <Dropdown></Dropdown>

                <div className="hidden md:block w-auto" id="navbar-default">
                    <ul className="flex p-4  bg-gray-50 flex-row   mt-0 text-md   dark:bg-custom-900 ">
                        <li>
                            <a href="/" className="block pr-5 border-r border-gray-600 text-blue-500 hover:text-blue-700" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/" className="block px-5 border-r border-gray-600 text-gray-400 hover:text-gray-100  ">About</a>
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
                        <li>
                            <a href="/" className="block px-5 border-r border-gray-600 text-gray-400 hover:text-gray-100  ">Services</a>
                        </li>
                        <li>
                            <a href="/" className="block pl-5 text-gray-400 hover:text-gray-100  ">Contact</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );

}

export default Navbar;

