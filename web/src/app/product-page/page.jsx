import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React, { useState } from 'react'

const page = () => {
    // const [productdata, setProductData]= useState(null);
    
    return (
        <>
            <Navbar />
            <div className="w-[80%] mx-auto pt-[200px] mt-[30px]">
                <p className='my-5 py-6'>
                    Home /
                </p>
                <div className=' flex flex-col md:flex-row p-7'>
                    <div className='w-[30%] p-10'>
                        <img src="" alt="" />
                    </div>
                    <div className='w-1/2'>
                        <p className='text-3xl font-bold'>hello</p>
                        <p className='text-2xl font-bold'>hello</p>
                        <p className='py-3'>price</p>
                        <div>
                            <p className='py-3 '>Quantity</p>
                            <button  className='bg-black text-white text-lg px-2 outline-none border-none mr-2 rounded-md'>-</button>
                            <span>1</span>
                            <button  className='bg-black outline-none border-none text-white text-lg px-1.5 ml-2 rounded-md'>+</button>
                        </div>
                        <button className='my-5 py-4 px-5 outline-none border-none rounded bg-black text-white '>ADD TO CART</button>
                    </div>
                </div>
                <div className='my-6 mx-3'>
                    <h1 className='text-3xl font-bold'>hello</h1>
                    <p className=' my-3'>discription</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page