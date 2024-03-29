import { logo } from '@/assets'
import Head from 'next/head';
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function Login() {
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const registData: any = localStorage.getItem("userRegist");
        if (registData) {
            setUser(JSON.parse(registData))
        }
    }, [])

    const login = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        try {
            const payload = {
                email: e.target.email.value,
                password: e.target.password.value
            }
            if (payload.email == user?.email) {
                if (payload?.password == user?.password) {
                    Swal.fire({
                        text: "Berhasil Login",
                        icon: "success"
                    })
                    localStorage.setItem("userSession", JSON.stringify({ access_token: 1 }))
                    setLoading(false)
                    router.push('/')
                } else {
                    Swal.fire({
                        text: "Password Salah!",
                        icon: "error"
                    })
                    setLoading(false)
                }
            } else {
                Swal.fire({
                    text: "Email tidak terdaftar!",
                    icon: "error"
                })
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            {/* Mobile First */}
            <div className='md:hidden block'>
                <div className='flex flex-col justify-center items-center'>
                    <Image src={logo} alt='logo' className='w-[300px]' />
                    <form className='px-5 w-full' onSubmit={login}>
                        <div>
                            <div className="w-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder='Masukkan Email'
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type={show ? "text" : "password"}
                                        placeholder='********'
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className='w-full mt-2 justify-between flex items-end'>
                                    <div className='mt-2 flex gap-2 items-center'>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => { setShow(e.target.checked) }}
                                            className="block w-auto rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                        />
                                        <p>Tampilkan Password</p>
                                    </div>
                                    <a href='/forget-password' className='text-red-500'>Lupa Password?</a>
                                </div>
                            </div>

                            <div className='w-full mt-4'>
                                <button type='submit' disabled={loading} className='p-2 bg-blue-500 hover:bg-blue-400 duration-300 transition w-full h-auto rounded-md text-white'>
                                    {loading ? "Memproses..." : "Masuk"}
                                </button>
                                <p className='text-center'>atau</p>
                                <button type='button' onClick={() => { router.push("/register") }} className='p-2 bg-green-500 hover:bg-green-400 duration-300 transition w-full mt-2 h-auto rounded-md text-white'>
                                    Daftar
                                </button>
                                <div className='mt-4 flex justify-center items-center'>
                                    <a href="/" className='text-blue-500'>Kembali ke halaman awal</a>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
