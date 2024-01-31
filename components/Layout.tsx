import React from 'react'
import Sidebar from './Sidebar'
import Head from 'next/head'

type Props = {
    children: any
}

export default function Layout(props: Props) {
    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className='w-full flex flex-row'>
                <Sidebar />
                <main className='w-full'>
                    {props.children}
                </main>
            </div>
        </div>
    )
}
