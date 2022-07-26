import Dropdown from './Dropdown'

const Navbar = () => {
    return (

        <nav class="bg-white relative w-full border-b border-blue-500 px-8 py-2.5 rounded dark:bg-custom-900">
            <div class="flex flex-wrap justify-between items-center mx-auto">

                <a href="https://flowbite.com/" class="flex items-center">
                    <img src="/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Something Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Something</span>
                </a>

                <Dropdown></Dropdown>

                <div class="hidden md:block w-auto" id="navbar-default">
                    <ul class="flex p-4  bg-gray-50 flex-row   mt-0 text-md   dark:bg-custom-900 ">
                        <li>
                            <a href="/" className="block pr-5 border-r border-gray-600 text-blue-500 hover:text-blue-700" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/" className="block px-5 border-r border-gray-600 text-gray-400 hover:text-gray-100  ">About</a>
                        </li>
                        <li>
                            <a href="/" className="block px-5 border-r border-gray-600 text-gray-400 hover:text-gray-100  ">Services</a>
                        </li>                        <li>
                            <a href="/" className="block px-5 border-r border-gray-600 text-gray-400 hover:text-gray-100  ">Pricing</a>
                        </li>                        <li>
                            <a href="/" className="block pl-5 text-gray-400 hover:text-gray-100  ">Contact</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );

}

export default Navbar;

