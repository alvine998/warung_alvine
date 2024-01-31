import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div>
      <Head>
        <title>Warung Alvine</title>
      </Head>
      <div className='bg-white shadow-lg p-2 w-full h-auto flex gap-3 justify-center items-center'>
        <h5 className='text-center font-bold text-xl font-sans'>Warung Alvine</h5>
        <a href="#" className='ml-4 flex justify-center items-center' onMouseEnter={() => { setIsOpen(true) }}>
          <p>Produk</p>
          <ChevronDownIcon className='w-4 ml-1 text-black' />
        </a>
        {isOpen && (
          <div onMouseLeave={() => { setIsOpen(false) }} className="absolute z-10 top-0 left-50 ml-[50px] mt-12 w-60 bg-white border rounded shadow-md">
            {/* Dropdown content goes here */}
            <ul>
              <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
                Makanan
              </li>
              <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
                Minuman
              </li>
              <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
                Kebutuhan Mandi
              </li>
              <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
                Obat-obatan
              </li>
              <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
                Pulsa & Kuota
              </li>
              <li className="py-2 px-4 cursor-pointer hover:bg-gray-200">
                Topup Dana, Shopeepay, dll
              </li>
            </ul>
          </div>
        )}
        <a href="#">Tentang Kami</a>
        <a href="#">Hubungi Kami</a>
      </div>
    </div>

  )
}
