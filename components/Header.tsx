import React, { Fragment, useState } from 'react'
import SideOut from './SideOut';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { ArchiveBoxIcon, ArrowLeftEndOnRectangleIcon, CreditCardIcon, DocumentCheckIcon, DocumentTextIcon, HomeIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';

type Props = {
    title: string;
}

export default function Header(props: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter();
    const navigations: any[] = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: <HomeIcon className='w-5' />,
            active: router.pathname == "/admin/dashboard"
        },
        {
            name: "Produk",
            href: "/admin/product",
            icon: <ArchiveBoxIcon className='w-5' />,
            active: router.pathname == "/admin/product"
        },
        {
            name: "Kasir",
            href: "/admin/cashier",
            icon: <UserCircleIcon className='w-5' />,
            active: router.pathname == "/admin/cashier"
        },
        {
            name: "Transaksi",
            href: "/admin/transaction",
            icon: <DocumentTextIcon className='w-5' />,
            active: router.pathname == "/admin/transaction"
        },
        {
            name: "Pembayaran",
            href: "/admin/payment",
            icon: <CreditCardIcon className='w-5' />,
            active: router.pathname == "/admin/payment"
        },
        {
            name: "Laporan",
            href: "/admin/report",
            icon: <DocumentCheckIcon className='w-5' />,
            active: router.pathname == "/admin/report"
        },
        {
            name: "Pengguna",
            href: "/admin/user",
            icon: <UsersIcon className='w-5' />,
            active: router.pathname == "/admin/user"
        },
        {
            name: "Logout",
            href: "/admin/login",
            icon: <ArrowLeftEndOnRectangleIcon className='w-5' />,
            active: router.pathname == "/admin/login"
        },
    ]


    return (
        <div>
            <SideOut isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className='flex justify-center items-center mt-2'>
                    <a href="#" className='font-bold text-2xl'>Warung Alvine</a>
                </div>
                <div className='flex flex-col gap-4 mt-5'>
                    {
                        navigations?.map((val:any, idx:number) => (
                            <div key={idx} className={val?.active ? "bg-blue-500 w-full px-5 py-2 text-white" : "px-5 hover:text-white hover:bg-blue-500 w-full hover:py-2"}>
                                <a href={val?.href} className='flex gap-2 text-xl'>{val?.icon}{val?.name}</a>
                            </div>
                        ))
                    }
                </div>
            </SideOut>
            <div className='bg-gradient-to-r from-green-300 to-green-400 w-full h-[60px] flex justify-between items-center px-5 sm:px-10'>
                <h2 className='text-xl font-bold'>{props.title}</h2>
                <button className='sm:hidden block' type='button' onClick={() => { setIsOpen(true) }}>
                    <Bars3Icon className='w-6 text-black' />
                </button>
            </div>
        </div>
    )
}
