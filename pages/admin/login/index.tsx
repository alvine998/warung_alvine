import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export default function Login() {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className='flex flex-col gap-4 justify-center items-center from-blue-300 bg-gradient-to-r to-blue-400  h-[100vh] sm:px-[70vh] px-10'>
                <h5 className='sm:text-3xl text-2xl font-bold text-center text-white'>Admin Warung Alvine</h5>
                <div className='bg-white shadow-lg rounded-lg p-5 w-full h-auto flex justify-center flex-col gap-4 items-center'>
                    <div className='sm:px-10 px-2 w-full'>
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
                                    type="password"
                                    placeholder='********'
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className='w-full mt-4'>
                            <button className='p-2 bg-blue-500 hover:bg-blue-400 duration-300 transition w-full h-auto rounded-md text-white'>
                                Masuk
                            </button>
                            <button type='button' onClick={() => { router.push("/") }} className='p-2 bg-green-500 hover:bg-green-400 duration-300 transition w-full mt-2 h-auto rounded-md text-white'>
                                Kembali
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
