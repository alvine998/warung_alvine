import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { useModal } from '@/hooks/modal'
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Chart from 'react-google-charts'
import ReactSelect from 'react-select'

const dummy = [
    {
        id: 1,
        name: "Dana",
        type: "ewallet",
        account_number: "085703049632",
        account_holder: "Alvine Yoga Pratama",
        status: "active"
    },
    {
        id: 2,
        name: "Tunai",
        type: "cash",
        account_number: "-",
        account_holder: "-",
        status: "active"
    },
    {
        id: 3,
        name: "Bank BCA",
        type: "bank",
        account_number: "33335555",
        account_holder: "Alvine Yoga Pratama",
        status: "active"
    },
]

export default function Payment() {
    const [show, setShow] = useState<boolean>(false)
    const [modal, setModal] = useModal();
    const [selected, setSelected] = useState<any>({ value: "cash", label: "Tunai" })

    useEffect(() => {
        if (typeof window !== undefined) {
            setShow(true)
        }
    }, [])
    return (
        <Layout>
            <div className='bg-gradient-to-r from-green-300 to-green-400 w-full h-[60px] flex items-center px-10'>
                <h2 className='text-xl font-bold'>Pembayaran</h2>
            </div>
            <div className='mt-5 px-2'>
                <div className='flex justify-between items-center'>
                    <div>
                        <button type='button' onClick={() => {
                            setModal({ ...modal, data: null, key: "create", open: true })
                        }} className='bg-blue-500 p-1 hover:bg-blue-400 duration-300 flex justify-center items-center gap-2 transition w-full h-auto rounded-md text-white'>
                            <PlusCircleIcon className='w-5' /> Tambah Data
                        </button>
                    </div>
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
                {
                    show ?
                        <DataTable
                            columns={[
                                {
                                    name: "Nama",
                                    sortable: true,
                                    selector: (row: any) => row?.name || "-"
                                },
                                {
                                    name: "type",
                                    sortable: true,
                                    selector: (row: any) => row?.type || "-"
                                },
                                {
                                    name: "Nomor Rekening / ID",
                                    sortable: true,
                                    selector: (row: any) => row?.account_number || "-"
                                },
                                {
                                    name: "Pemilik Rekening / ID",
                                    sortable: true,
                                    selector: (row: any) => row?.account_holder || "-"
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
                        /> : ""
                }
                {
                    modal.key == "create" ?
                        <Modal
                            open={modal.open}
                            setOpen={() => { setModal({ ...modal, open: false }) }}
                        >
                            <form onSubmit={() => { }}>
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='font-semibold text-lg'>{modal.key == 'create' ? 'Tambah Data' : 'Ubah Data'} Pembayaran</h1>
                                    <div className='w-full'>
                                        <div className='w-full mt-2'>
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-500">
                                                Nama Akun Pembayaran
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                placeholder='Masukkan Nama Akun Pembayaran'
                                                type='text'
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                            />

                                            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-500 mt-2">
                                                Jenis Pembayaran
                                            </label>
                                            <ReactSelect
                                                id='type'
                                                className='z-50'
                                                maxMenuHeight={150}
                                                menuPortalTarget={document.body}
                                                defaultValue={[{ value: "cash", label: "Tunai" }]}
                                                placeholder={"Pilih Jenis Pembayaran"}
                                                onChange={(e) => { setSelected(e) }}
                                                options={[
                                                    { value: "cash", label: "Tunai" },
                                                    { value: "ewallet", label: "E-Wallet" },
                                                    { value: "bank", label: "Bank" }
                                                ]}
                                                styles={{
                                                    input: (base) => ({
                                                        ...base,
                                                        "input:focus": {
                                                            boxShadow: "none",
                                                        },
                                                        zIndex: 9999
                                                    }),
                                                    control: (base) => ({
                                                        ...base,
                                                        fontSize: "13px",
                                                        zIndex: 9999
                                                        // borderColor: error ? "red" : "#d1d5db",
                                                    }),
                                                    option: (base) => ({
                                                        ...base,
                                                        fontSize: "13px",
                                                        zIndex: 9999
                                                    }),
                                                    menuPortal: (base) => ({
                                                        ...base,
                                                        zIndex: 9999
                                                    })
                                                }}
                                            />

                                            {
                                                selected?.value !== 'cash' ?
                                                    <>
                                                        <label htmlFor="qrcode" className="block text-sm font-medium leading-6 text-gray-500 mt-2">
                                                            Gambar QR Code
                                                        </label>
                                                        <input type='file' accept='image/*' id='qrcode'
                                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                                        />
                                                    </> : ""
                                            }

                                            <label htmlFor="account_number" className="block text-sm font-medium leading-6 text-gray-500 mt-2">
                                                Nomor Rekening / ID
                                            </label>
                                            <input
                                                id="account_number"
                                                name="account_number"
                                                placeholder='Masukkan Nomor Rekening / ID'
                                                type='text'
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                            />

                                            <label htmlFor="account_holder" className="block text-sm font-medium leading-6 text-gray-500 mt-2">
                                                Pemilik Rekening / ID
                                            </label>
                                            <input
                                                id="account_holder"
                                                name="account_holder"
                                                placeholder='Masukkan Pemilik Rekening / ID'
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' className='bg-blue-500 p-2 mt-4 hover:bg-blue-400 duration-300 flex justify-center items-center gap-2 transition w-full h-auto rounded-md text-white'>
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </Modal> : ""
                }
            </div>

        </Layout>
    )
}
