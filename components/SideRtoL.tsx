import { Transition } from '@headlessui/react'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    children: any;
}

export default function SideRtoL(props: Props) {   
    return (
        <Transition
            show={props.isOpen}
            enter="transition-transform duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
            <div className="fixed top-0 right-0 h-full w-full bg-white shadow-md z-40 p-2 overflow-hidden">
                {/* Sidebar content */}
                <div className='flex justify-end items-center'>
                    <button type='button' onClick={()=>{props.setIsOpen(false)}}>
                        <ArrowRightCircleIcon className='w-10' />
                    </button>
                </div>
                {props.children}
            </div>
        </Transition>
    )
}
