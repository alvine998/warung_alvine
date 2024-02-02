import React, { useEffect, useState } from 'react'
import { ArrowLeftEndOnRectangleIcon, BanknotesIcon, ChevronDownIcon, ClockIcon, CreditCardIcon, EnvelopeIcon, HomeIcon, InformationCircleIcon, ShoppingBagIcon, ShoppingCartIcon, UserCircleIcon, UserIcon, WalletIcon, WifiIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'
import { deposit, nuvoblue, pulsa, wallet, withdraw } from '@/assets'
import Image, { StaticImageData } from 'next/image'
import SideRtoL from '@/components/SideRtoL'
import { useRouter } from 'next/router'
import { useModal } from '@/hooks/modal'
import Modal from '@/components/Modal'

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [openSide, setOpenSide] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const [modal, setModal] = useModal();

  const navigations: any[] = [
    {
      name: "Ubah Profil",
      href: "/profil",
      icon: <UserIcon className='w-5' />,
      active: router.pathname == "/profil"
    },
    {
      name: "Riwayat Belanja",
      href: "/order-history",
      icon: <ClockIcon className='w-5' />,
      active: router.pathname == "/order-history"
    },
    {
      name: "Tentang Kami",
      href: "/about",
      icon: <InformationCircleIcon className='w-5' />,
      active: router.pathname == "/about"
    },
    {
      name: "Logout",
      icon: <ArrowLeftEndOnRectangleIcon className='w-5' />,
      onClick: () => setModal({ ...modal, open: true, key: "logout", data: null })
    },
  ]

  useEffect(() => {
    if (typeof window !== undefined) {
      setShow(true)
    }
  }, [])

  useEffect(() => {
    const token: any = localStorage.getItem("userSession");
    if (JSON.parse(token)?.access_token) {
      setIsLogin(true)
    }
  }, [])

  const logout = async (e: any) => {
    e.preventDefault();
    try {
      localStorage.removeItem("userSession")
      setModal({...modal, open: false})
      setOpenSide(false)
      setIsLogin(false)
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Head>
        <title>Warung Alvine</title>
      </Head>
      {
        show ?
          <>
            {/* Desktop Version */}
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

            {/* Mobile Version */}
            <div className='sm:hidden block'>
              {/* Header */}
              <div className='bg-gradient-to-l from-blue-500 to-blue-400 flex justify-center items-center w-full h-[70px] rounded-b-2xl'>
                <h1 className='text-2xl text-white font-sans font-bold'><a href="/">Warung Alvine</a></h1>
              </div>

              {/* Sidebar */}
              {
                openSide ?
                  <SideRtoL
                    isOpen={openSide}
                    setIsOpen={() => { setOpenSide(false) }}
                  >
                    <div>
                      <div className='flex justify-center items-center mt-2'>
                        <a href="#" className='font-bold text-2xl'>Warung Alvine</a>
                      </div>
                      {
                        !isLogin ?
                          <>
                            <div className='flex justify-center items-center flex-col mt-[100px] px-10'>
                              <h1 className='font-semibold text-lg'>Sudah punya akun?</h1>
                              <button onClick={() => { router.push('login') }} className='p-1 mt-2 bg-blue-500 hover:bg-blue-400 duration-300 transition w-full h-auto rounded-md text-white'>
                                Login
                              </button>
                              <button onClick={() => { router.push('register') }} className='p-1 mt-2 bg-green-500 hover:bg-green-400 duration-300 transition w-full h-auto rounded-md text-white'>
                                Daftar
                              </button>
                            </div>
                          </> : <>
                            <div className='flex flex-col gap-4 mt-5'>
                              {
                                navigations?.map((val: any, idx: number) => (
                                  <div key={idx} className={val?.active ? "bg-blue-500 w-full px-5 py-2 text-white" : "px-5 hover:text-white hover:bg-blue-500 w-full hover:py-2"}>
                                    <a href={val?.href} onClick={val?.onClick} className='flex gap-2 text-xl'>{val?.icon}{val?.name}</a>
                                  </div>
                                ))
                              }
                              {/* Modal Logout */}
                              {
                                modal.key === "logout" ?
                                  <Modal open={modal.open} setOpen={() => { setModal({ ...modal, open: false }) }}>
                                    <form onSubmit={logout}>
                                      <p className='text-center'>Apakah anda yakin ingin keluar?</p>
                                      <button type='submit' className='p-2 mt-4 bg-red-500 hover:bg-red-400 duration-300 transition w-full mt-2 h-auto rounded-md text-white'>
                                        Keluar
                                      </button>
                                      <button type='button' onClick={() => { setModal({ ...modal, open: false }) }} className='p-2 bg-white hover:border-blue-400 border duration-300 transition w-full mt-2 h-auto rounded-md border-gray-300'>
                                        Batal
                                      </button>
                                    </form>
                                  </Modal> : ""
                              }
                            </div>
                          </>
                      }
                      <div className='fixed bottom-0 right-0 left-0'>
                        <p className='text-center'>Powered by Alvinecom</p>
                      </div>
                    </div>
                  </SideRtoL> : ""
              }

              {/* Content */}
              <div className='py-4 px-2 pb-20'>
                <input
                  name="search"
                  type="search"
                  autoComplete="off"
                  placeholder='Cari disini'
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                />

                <div className='mt-7 px-4 flex gap-5 justify-center items-start'>
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

                {/* Produk Hari Ini */}
                <div className='p-4 mt-5 flex justify-center items-center gap-2'>
                  <button className='shadow-lg rounded-lg border border-blue-400 p-2'>
                    <Image src={nuvoblue} alt='nuvo' className='w-[150px]' />
                    <p className=''>Sabun Nuvo Biru</p>
                    <p className='font-semibold'>Rp 5.000</p>
                    <button className='p-1 mt-2 bg-blue-500 hover:bg-blue-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      Beli
                    </button>
                    <button className='p-1 mt-2 bg-green-500 hover:bg-green-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      + Keranjang
                    </button>
                  </button>

                  <button className='shadow-lg rounded-lg border border-blue-400 p-2'>
                    <Image src={nuvoblue} alt='nuvo' className='w-[150px]' />
                    <p className=''>Sabun Nuvo Biru</p>
                    <p className='font-semibold'>Rp 5.000</p>
                    <button className='p-1 mt-2 bg-blue-500 hover:bg-blue-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      Beli
                    </button>
                    <button className='p-1 mt-2 bg-green-500 hover:bg-green-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      + Keranjang
                    </button>
                  </button>
                </div>

                {/* Produk Pilihan */}
                <div className='p-4 mt-5 flex justify-center items-center gap-2'>
                  <button className='shadow-lg rounded-lg border border-blue-400 p-2'>
                    <Image src={nuvoblue} alt='nuvo' className='w-[150px]' />
                    <p className=''>Sabun Nuvo Biru</p>
                    <p className='font-semibold'>Rp 5.000</p>
                    <button className='p-1 mt-2 bg-blue-500 hover:bg-blue-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      Beli
                    </button>
                    <button className='p-1 mt-2 bg-green-500 hover:bg-green-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      + Keranjang
                    </button>
                  </button>

                  <button className='shadow-lg rounded-lg border border-blue-400 p-2'>
                    <Image src={nuvoblue} alt='nuvo' className='w-[150px]' />
                    <p className=''>Sabun Nuvo Biru</p>
                    <p className='font-semibold'>Rp 5.000</p>
                    <button className='p-1 mt-2 bg-blue-500 hover:bg-blue-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      Beli
                    </button>
                    <button className='p-1 mt-2 bg-green-500 hover:bg-green-400 duration-300 transition w-full h-auto rounded-md text-white'>
                      + Keranjang
                    </button>
                  </button>
                </div>
              </div>

              {/* Bottom Tabs */}
              <div className='fixed bottom-0 w-full bg-gradient-to-r from-blue-400 to-blue-500 h-[60px] px-1 py-2'>
                <div className='flex justify-center items-center gap-4'>
                  <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { }}>
                    <HomeIcon className='w-7' />
                    Beranda
                  </button>
                  <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { }}>
                    <ShoppingCartIcon className='w-7' />
                    Pesanan
                  </button>
                  <button type='button' className='flex flex-col text-blue-500 items-center justify-center bg-white w-[90px] h-[80px] rounded-full -mt-16 outline outline-blue-300 shadow-lg' onClick={() => { }}>
                    <ShoppingBagIcon className='w-10' />
                    Belanja
                  </button>
                  <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { }}>
                    <EnvelopeIcon className='w-7' />
                    Inbox
                  </button>
                  <button type='button' className='flex flex-col text-white items-center justify-center w-[60px]' onClick={() => { setOpenSide(true) }}>
                    <UserCircleIcon className='w-7' />
                    Profil
                  </button>
                </div>
              </div>
            </div>
          </> : ""
      }
    </div>

  )
}
