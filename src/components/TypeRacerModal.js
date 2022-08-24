import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Fragment, memo } from 'react'

const TypeRacerModal = memo(({ show, reset, data }) => {
	const [arr,setArr] = useState([0,0])

	useEffect(()=>{
		if(show)setArr(data)
	},[show])

	return (
		<>
			<Transition show={show} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={reset}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-custom-blue bg-opacity-90"></div>
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-100"
							>

								<Dialog.Panel className="w-full max-w-md border-black border-opacity-20 border-4 transform overflow-hidden rounded-md dark:bg-custom-900 bg-white p-6 text-center transition-all">

									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-purple-600">
										Time's up!
									</Dialog.Title>

									<div className="mt-2">
										<p className="text-sm text-gray-500">
											{arr[0]} {arr[1]}
										</p>
									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center outline-none rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-violet-500"
											onClick={reset}
										>
											Retry!
										</button>
									</div>

								</Dialog.Panel>

							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
})

export default TypeRacerModal