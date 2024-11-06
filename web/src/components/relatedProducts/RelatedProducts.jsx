import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import Link from "next/link";
import Pagination from '../Pagination/Pagination';
const RelatedProducts = () => {
    return (
        <div className="bg-gray-100">
            <div className='flex flex-col md:flex-row w-[75%] m-auto  py-8'>
                {/* lc subcategories / leftside*/}
                <div className="min-w-[300px] my-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <p className='border-b border-gray-800 py-3 '><strong>LC</strong></p>
                        <p className='pt-3 hover:text-gray-300'>HCPL COLUMNS</p>
                        <p className='pt-1 hover:text-gray-300'>Accessories</p>
                        <p className='pt-1 pb-3 hover:text-gray-300'>Safety System</p>
                    </div>

                </div>

                {/* right side */}
                <div className="flex-1  md:m-8 ">
                    <div className="flex justify-between">
                        <div>
                            <select name="" id="" className='p-2 rounded-xl text-sm'>
                                <option value="">Sort By:Featured Items</option>
                                <option value="">Sort By:Newest Items</option>
                                <option value="">Sort By:A To Z</option>
                                <option value="">Sort By:Z To A</option>
                                <option value="">Sort By:Pricing: Ascending</option>
                                <option value="">Sort By:Pricing:Decesing</option>
                            </select>
                        </div>


                        <div className='rounded-xl hidden md:block'>
                            <Pagination/>
                        </div>


                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 gap-y-6'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    <div className="flex w-full justify-end py-4">
                    <Pagination/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts