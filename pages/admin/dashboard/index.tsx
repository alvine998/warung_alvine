import Header from '@/components/Header'
import Layout from '@/components/Layout'
import React from 'react'
import Chart from 'react-google-charts'

export default function Dashboard() {
    return (
        <Layout>
            <Header title='Dashboard' />
            <div className='mt-5 sm:px-0 px-5'>
                <label htmlFor="chart" className='sm:ml-[150px] ml-0 text-lg font-semibold'>Statistik Keuangan</label>
                <div className='flex flex-col justify-center items-center mt-2 w-full'>
                    <Chart
                        chartType="Line"
                        data={[["Year", "Value"], ["0", 0], ["2023", 1000000], ["2024", 1500000]]}
                        className='w-full h-[400px] px-10'
                        legendToggle
                    />
                </div>
            </div>

        </Layout>
    )
}
