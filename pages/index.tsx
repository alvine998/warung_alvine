import React, { useState } from 'react'
import { BanknotesIcon, ChevronDownIcon, CreditCardIcon, EnvelopeIcon, HomeIcon, ShoppingBagIcon, ShoppingCartIcon, UserCircleIcon, WalletIcon, WifiIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'
import { deposit, pulsa, wallet, withdraw } from '@/assets'
import Image, { StaticImageData } from 'next/image'

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div>
      <Head>
        <title>Warung Alvine</title>
      </Head>
      <div className='bg-white shadow-lg p-2 w-full h-auto gap-3 justify-center items-center sm:flex hidden'>
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

      <div className='sm:hidden block'>
        {/* Header */}
        <div className='bg-gradient-to-l from-blue-500 to-blue-400 flex justify-center items-center w-full h-[70px] rounded-b-2xl'>
          <h1 className='text-2xl text-white font-sans font-bold'><a href="/">Warung Alvine</a></h1>
        </div>

        {/* Content */}
        <div className='py-4 px-2'>
          <input
            name="search"
            type="search"
            autoComplete="off"
            placeholder='Cari disini'
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
          />

          <div className='mt-7 px-4 flex gap-5 justify-start items-start'>
            <button className='flex flex-col justify-center items-center w-[80px]'>
              <Image src={pulsa} alt='withdraw' className='w-10' />
              Pulsa Data
            </button>
            <button className='flex flex-col justify-center items-center w-[60px]'>
              <Image src={wallet} alt='withdraw' className='w-10' />
              Top Up E-Wallet
            </button>
            <button className=' flex flex-col justify-center items-center w-[60px]'>
              <Image src={withdraw} alt='withdraw' className='w-10' />
              Tarik Tunai
            </button>
            <button className='flex flex-col justify-center items-center w-[60px]'>
              <Image src={deposit} alt='withdraw' className='w-10' />
              Setor Tunai
            </button>
          </div>


        </div>

        {/* Bottom Tabs */}
        <div className='fixed bottom-0 w-full bg-gradient-to-r from-blue-400 to-blue-500 h-[60px] p-2'>
          <div className='flex justify-center items-center gap-4'>
            <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { }}>
              <HomeIcon className='w-7' />
              Beranda
            </button>
            <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { }}>
              <ShoppingCartIcon className='w-7' />
              Pesanan
            </button>
            <button type='button' className='flex flex-col text-blue-500 items-center justify-center bg-white w-[80px] h-[80px] rounded-full -mt-16 outline outline-blue-300 shadow-lg' onClick={() => { }}>
              <ShoppingBagIcon className='w-10' />
              Belanja
            </button>
            <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { }}>
              <EnvelopeIcon className='w-7' />
              Inbox
            </button>
            <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { }}>
              <UserCircleIcon className='w-7' />
              Profil
            </button>
          </div>
        </div>
      </div>

    </div>

  )
}
