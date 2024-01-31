import { Transition } from '@headlessui/react'
import { ArrowLeftCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    isOpen: boolean;
    setIsOpen: any;
    children: any;
}

export default function SideOut(props: Props) {
    const router = useRouter();
    
    return (
        <Transition
            show={props.isOpen}
            enter="transition-transform duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
            <div className="fixed top-0 left-0 h-full w-full bg-white shadow-md z-40 p-2 overflow-hidden">
                {/* Sidebar content */}
                <div className='flex justify-end items-center'>
                    <button type='button' onClick={()=>{props.setIsOpen(false)}}>
                        <ArrowLeftCircleIcon className='w-10' />
                    </button>
                </div>
                {props.children}
            </div>
        </Transition>
    )
}
