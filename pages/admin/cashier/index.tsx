import Header from '@/components/Header'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import SideOut from '@/components/SideOut'
import { useModal } from '@/hooks/modal'
import { formatRupiah } from '@/utils'
import { BanknotesIcon, Bars3Icon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import ReactSelect from 'react-select'
import Swal from 'sweetalert2'

const dummy = [
    {
        id: 1,
        name: "Baygon",
        price: 5000,
        stock: 5,
        code: "PROD001"
    },
    {
        id: 2,
        name: "Sabun Nuvo",
        price: 3000,
        stock: 10,
        code: "PROD002"
    },
]

export default function Cashier() {
    const [LISTProduct, setLISTProduct] = useState<any>(dummy?.map((v: any) => ({ ...v, value: v?.id, label: v?.code + " - " + v?.name })))
    const [payload, setPayload] = useState<any>({
        total: 0,
        items: [],
        payment_type: 'cash',
        value_changes: 0,
        pay: 0
    })
    const [selected, setSelected] = useState<any>()
    const [modal, setModal] = useModal()
    const [item, setItem] = useState<any>({
        name: "",
        code: "",
        price: 0,
        total_item: 1,
        total_price: 0
    })

    const column: any[] = [
        {
            name: "Kode",
            sortable: true,
            selector: (row: any) => row?.code || "-"
        },
        {
            name: "Nama Produk",
            sortable: true,
            selector: (row: any) => row?.name || "-"
        },
        {
            name: "Harga",
            sortable: true,
            selector: (row: any) => formatRupiah(row?.price) || "-"
        },
        {
            name: "Jumlah",
            sortable: true,
            selector: (row: any) => row?.total_item || "-"
        },
        {
            name: "Total Harga",
            selector: (row: any) => formatRupiah(row?.total_price) || "-"
        },
        {
            name: "Aksi",
            selector: (row: any) => <>
                <button type='button' onClick={() => {
                    setPayload({
                        ...payload,
                        items: payload?.items?.filter((v: any, i: number) => v?.code !== row?.code),
                        total: payload?.total - row?.total_price
                    })
                    const addStock = LISTProduct?.map((v: any) => {
                        if (v?.code === row?.code) {
                            v.stock = +v.stock + +row.total_item
                        }
                        return v
                    })

                    setLISTProduct(addStock)
                }}>
                    <XMarkIcon className='text-red-500 w-5' />
                </button>
            </>
        },
    ]

    const addItems = async (e: any) => {
        e.preventDefault()
        try {
            if (!item?.code) {
                return Swal.fire({
                    text: "Silahkan pilih produk terlebih dahulu!",
                    icon: "warning"
                })
            }
            if (item?.total_item > item?.stock) {
                return Swal.fire({
                    text: "Jumlah Produk Melebihi Batas Stok",
                    icon: "warning"
                })
            }
            if (payload?.items?.length > 0) {
                const newState = payload?.items?.map((v: any) => {
                    if (v?.code === item?.code) {
                        v.total_item = v.total_item + item.total_item;
                        v.total_price = v.total_price + item.total_price;
                    }
                    return v
                })
                setPayload({
                    ...payload,
                    items: newState,
                    total: +payload.total + +item.total_price
                })
            } else {
                setPayload({
                    ...payload,
                    items: [...payload.items, item],
                    total: +payload.total + +item.total_price
                })
            }

            const minusStock = LISTProduct?.map((v: any) => {
                if (v?.code === item?.code) {
                    v.stock = +v.stock - +item.total_item
                }
                return v
            })

            setLISTProduct(minusStock)

            setItem({
                name: "",
                code: "",
                price: 0,
                total_item: 1,
                total_price: 0
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div>
                <Header title='Kasir' />
                <div className='px-2 mt-5'>
                    <form onSubmit={addItems}>
                        <label htmlFor="total" className="block text-lg font-medium leading-6 text-gray-500">
                            Total Harga
                        </label>
                        <input
                            id='total'
                            name="total"
                            type="text"
                            placeholder='0'
                            value={formatRupiah(payload?.total)}
                            readOnly
                            className="block w-full rounded-md border-0 py-1.5 px-4 h-20 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none text-3xl sm:leading-6"
                        />
                        <div className='w-full'>
                            <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-500">
                                Produk
                            </label>
                            <ReactSelect
                                id='product'
                                className='w-full'
                                options={LISTProduct}
                                onChange={(e: any) => {
                                    setItem({
                                        ...e,
                                        total_price: +e.price,
                                        total_item: 1
                                    })
                                }}
                                placeholder="Pilih Produk"
                            />
                        </div>
                        <div className='w-full flex sm:flex-row flex-col gap-2 mt-2'>
                            <div className='w-full'>
                                <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-500">
                                    Kode
                                </label>
                                <input
                                    id='code'
                                    name="code"
                                    placeholder='Masukkan Kode Barang'
                                    value={item?.code}
                                    readOnly
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className='w-full'>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-500">
                                    Nama Produk
                                </label>
                                <input
                                    id='name'
                                    name="name"
                                    placeholder='Masukkan Nama Produk'
                                    value={item?.name}
                                    readOnly
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className='w-full'>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-500">
                                    Harga
                                </label>
                                <input
                                    id='price'
                                    name="price"
                                    type='text'
                                    placeholder='Masukkan Harga'
                                    value={formatRupiah(item?.price)}
                                    readOnly
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className='w-full'>
                                <label htmlFor="total_item" className="block text-sm font-medium leading-6 text-gray-500">
                                    Jumlah
                                </label>
                                <input
                                    id='total_item'
                                    name="total_item"
                                    placeholder='0'
                                    value={item?.total_item}
                                    onChange={(e) => {
                                        setItem({
                                            ...item,
                                            total_price: +item.price * +e.target.value,
                                            total_item: +e.target.value
                                        })
                                    }}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className='w-full'>
                                <label htmlFor="total_price" className="block text-sm font-medium leading-6 text-gray-500">
                                    Total Harga
                                </label>
                                <input
                                    id="total_price"
                                    name="total_price"
                                    placeholder='Total Harga'
                                    value={formatRupiah(item?.total_price)}
                                    readOnly
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>

                        </div>
                        <div className='w-full flex sm:flex-row flex-col gap-2 mt-2'>
                            <button type='submit' className='bg-blue-500 p-2 hover:bg-blue-400 duration-300 flex justify-center items-center gap-2 transition w-full h-auto rounded-md text-white'>
                                <PlusCircleIcon className='w-6' /> Tambah
                            </button>
                            <button type='button' disabled={payload?.items < 1} onClick={() => { setModal({ ...modal, open: true }) }} className='bg-green-500 p-2 hover:bg-green-400 duration-300 flex justify-center items-center gap-2 transition w-full h-auto rounded-md text-white'>
                                <BanknotesIcon className='w-6' /> Bayar
                            </button>
                        </div>
                    </form>
                </div>
                <div className='px-2 mt-2'>
                    <DataTable
                        columns={column}
                        data={payload?.items || []}
                        pagination
                        highlightOnHover
                        pointerOnHover
                    />
                </div>

                {
                    modal.open ?
                        <Modal
                            open={modal.open}
                            setOpen={() => { setModal({ ...modal, open: false }) }}
                        >
                            <div className='w-full'>
                                <form className='flex flex-col justify-center items-center' onSubmit={() => { }}>
                                    <h1 className='font-semibold text-lg'>Bayar</h1>
                                    <div className='w-full mt-2'>
                                        <label htmlFor="payment" className="block text-sm font-medium leading-6 text-gray-500">
                                            Pembayaran
                                        </label>
                                        <ReactSelect
                                            className='z-50'
                                            maxMenuHeight={150}
                                            menuPortalTarget={document.body}
                                            placeholder={"Pilih Pembayaran"}
                                            options={[
                                                { value: "cash", label: "Tunai" },
                                                { value: "dana", label: "DANA" },
                                                { value: "shopeepay", label: "Shopeepay" },
                                                { value: "bca", label: "BCA" },
                                                { value: "bni", label: "BNI" }
                                            ]}
                                            onChange={(e) => { setSelected(e?.value) }}
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
                                    </div>
                                    {
                                        selected == "cash" ?
                                            <div className='w-full mt-2'>
                                                <label htmlFor="total_price" className="block text-sm font-medium leading-6 text-gray-500">
                                                    Uang Pembayaran
                                                </label>
                                                <input
                                                    id="total_price"
                                                    name="total_price"
                                                    placeholder='Total Harga'
                                                    value={payload?.pay}
                                                    type='text'
                                                    onChange={(e) => {
                                                        const inputs = e.target.value?.replace(/\D/g, '')
                                                        setPayload({
                                                            ...payload,
                                                            pay: inputs?.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                                            value_changes: +e.target.value.replaceAll(",", '') - +payload?.total
                                                        });
                                                    }}
                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                                />

                                                <label htmlFor="value_changes" className="block text-sm font-medium leading-6 text-gray-500">
                                                    Sisa Kembali
                                                </label>
                                                <input
                                                    id="value_changes"
                                                    name="value_changes"
                                                    placeholder='Sisa Kembali'
                                                    value={formatRupiah(payload?.value_changes)}
                                                    readOnly
                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                                />
                                            </div> : ""
                                    }
                                    <button type='submit' className='bg-blue-500 p-2 mt-4 hover:bg-blue-400 duration-300 flex justify-center items-center gap-2 transition w-full h-auto rounded-md text-white'>
                                        Bayar
                                    </button>
                                </form>
                            </div>
                        </Modal> : ""
                }
            </div>
        </Layout>
    )
}
