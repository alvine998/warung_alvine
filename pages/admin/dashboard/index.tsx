import Layout from '@/components/Layout'
import React from 'react'
import Chart from 'react-google-charts'

export default function Dashboard() {
    return (
        <Layout>
            <div className='bg-gradient-to-r from-green-300 to-green-400 w-full h-[60px] flex items-center px-10'>
                <h2 className='text-xl font-bold'>Dashboard</h2>
            </div>
            <div className='mt-5'>
                <label htmlFor="chart" className='ml-[150px] text-lg font-semibold'>Statistik Keuangan</label>
                <div className='flex flex-col justify-center items-center mt-2'>
                    <Chart
                        chartType="Line"
                        data={[["Year", "Value"], ["0", 0],["2023", 1000000], ["2024", 1500000]]}
                        width="80%"
                        height="400px"
                        legendToggle
                    />
                </div>
            </div>

        </Layout>
    )
}
