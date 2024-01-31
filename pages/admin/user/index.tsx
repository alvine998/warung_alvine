import Layout from '@/components/Layout'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import DataTable from 'react-data-table-component'
import Chart from 'react-google-charts'

const dummy = [
    {
        id: 1,
        name: "Alvine",
        role: "Super Admin",
        phone: "085703049632",
        email: "alvinecom2018@gmail.com",
        status: "active"
    }
]

export default function User() {
    return (
        <Layout>
            <div className='bg-gradient-to-r from-green-300 to-green-400 w-full h-[60px] flex items-center px-10'>
                <h2 className='text-xl font-bold'>Pengguna</h2>
            </div>
            <div className='mt-5 px-2'>
                <div className='flex justify-between items-center'>
                    <div>
                        <input
                            name="search"
                            type="text"
                            autoComplete="off"
                            placeholder='Cari disini'
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <DataTable
                    columns={[
                        {
                            name: "Nama",
                            sortable: true,
                            selector: (row: any) => row?.name || "-"
                        },
                        {
                            name: "Role",
                            sortable: true,
                            selector: (row: any) => row?.role || "-"
                        },
                        {
                            name: "No Hp",
                            sortable: true,
                            selector: (row: any) => row?.phone || "-"
                        },
                        {
                            name: "Email",
                            sortable: true,
                            selector: (row: any) => row?.email || "-"
                        },
                        {
                            name: "Status",
                            selector: (row: any) => row?.status || "-"
                        },
                        {
                            name: "Aksi",
                            selector: (row: any) => <>
                                <button>
                                    <PencilSquareIcon className='text-green-500 w-5' />
                                </button>
                                &nbsp;
                                <button>
                                    <TrashIcon className='text-red-500 w-5' />
                                </button>
                            </>
                        },
                    ]}
                    data={dummy}
                    pagination
                    highlightOnHover
                    pointerOnHover
                />
            </div>

        </Layout>
    )
}
