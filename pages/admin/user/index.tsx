import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { useModal } from '@/hooks/modal'
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
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
    const [modal, setModal] = useModal();
    return (
        <Layout>
            <Header title='Pengguna' />
            <div className='mt-5 px-2'>
                <div className='flex justify-between items-center sm:flex-row flex-col-reverse gap-2'>
                    <div className='sm:w-auto w-full'>
                        <button type='button' onClick={() => {
                            setModal({ ...modal, data: null, key: "create", open: true })
                        }} className='bg-blue-500 p-1 hover:bg-blue-400 duration-300 flex justify-center items-center gap-2 transition w-full h-auto rounded-md text-white'>
                            <PlusCircleIcon className='w-5' /> Tambah Data
                        </button>
                    </div>
                    <div className='sm:w-auto w-full'>
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
