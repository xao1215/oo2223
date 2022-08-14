import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiMenu } from "react-icons/hi"
import { NavLink, useLocation } from 'react-router-dom'

export default function Dropdown() {
    return (
        <Menu as="div" className="relative self-center block sm:hidden text-left">
            <div className="py-3 pr-3">
                <Menu.Button className="flex rounded-sm shadow-sm px-3 py-3 text-sm font-medium text-neutral-200 hover:text-neutral-50 hover:bg-custom-800 focus:outline-none">
                    <HiMenu className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0  mt-0 w-56 rounded-md shadow-lg bg-custom-800 ring-1 ring-black ring-opacity-80 focus:outline-none">
                    <div className="py-0">
                        <NavLink to="/" className={`block rounded-t-md px-4 py-2 text-sm ${(useLocation().pathname === "/") ? "text-amber-500" : ("text-gray-500 hover:text-gray-100 hover:bg-custom-900")} `}>
                            Snake
                        </NavLink>

                        <NavLink to="/gameoflife" className={`block px-4 py-2 text-sm ${(useLocation().pathname === "/gameoflife") ? "text-lime-500" : ("text-gray-500 hover:text-gray-100 hover:bg-custom-900")} `}>
                            Game of Life
                        </NavLink>

                        <NavLink to="/typeracer" className={`block rounded-b-md  px-4 py-2 text-sm ${(useLocation().pathname === "/typeracer") ? "text-pink-500" : ("text-gray-500 hover:text-gray-100 hover:bg-custom-900")} `}>
                            Tetris
                        </NavLink>


                        {/* <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="submit"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full text-left px-4 py-2 text-sm'
                                        )}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </form> */}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
