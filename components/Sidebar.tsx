import { ArchiveBoxIcon, ArrowLeftEndOnRectangleIcon, DocumentCheckIcon, DocumentTextIcon, HomeIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import React from 'react'

export default function Sidebar() {
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
            href: "/logout",
            icon: <ArrowLeftEndOnRectangleIcon className='w-5' />,
            active: router.pathname == "/logout"
        },
    ]
    return (
        <div className='bg-blue-500 h-[100vh] w-[250px]'>
            <div className='flex justify-center items-center mt-5'>
                <a href="/admin/dashboard" className='text-white text-xl font-semibold' >Warung Alvine</a>
            </div>
            <div className='mt-5'>
                {
                    navigations?.map((val: any, idx: number) => (
                        <button onClick={()=>{router.push(val?.href)}} key={idx} className={`flex gap-2 text-lg items-center w-full pl-5 py-2 ${val?.active ? 'bg-white text-black' : 'text-white duration-300 transition-all hover:bg-white hover:text-black'}`}>
                            {val?.icon} {val?.name}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
