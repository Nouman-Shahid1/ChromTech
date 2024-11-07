'use client'
import Profile from '@/components/Profile/Profile'
import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Link from 'next/link';
import CreateProducts from '@/components/CreateProducts/CreateProducts';

const page = () => {

    const [openAddProduct, setOpenAddProduct] = useState(false)

    const handleCreate = () => {
        setOpenAddProduct(true);
    }

    return (
        <>
            <div className="bg-gray-100 p-8">
                <Profile />
                {openAddProduct
                    ?
                    <CreateProducts setOpenAddProduct={setOpenAddProduct} />
                    // <CreateProducts />
                    :
                    ''
                }
                <div className="py-8 px-6">
                    <p className='text-lg'>HOME / LC</p>
                </div>
                <div className="relative bg-white rounded-xl  h-[250px] sm:h-[150px] py-8 w-full mx-auto">
                    <div className="px-6">
                        <p className='text-2xl text-gray-800'> <strong>Categories</strong></p>
                    </div>
                    <div className="absolute flex flex-col sm:flex-row bottom-5 sm:bottom-5 sm:right-5  ">
                        <div className='mx-3 bg-gray-100 p-2'>
                            <button className='pt-1 px-2'><CiSearch /></button>
                            <input type="text" className='border-none outline-none bg-gray-100 ' placeholder='Search...' />
                        </div>
                        <div>
                            <button className='py-2 px-2 m-3 sm:m-0 rounded-lg bg-red-500 text-white' onClick={handleCreate}>
                                Create Product
                            </button>
                        </div>
                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                    <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center py-6 px-2 bg-gray-100 text-sm'>
                        <b></b>
                        <b>Title</b>
                        <b>Slug</b>
                        <b>Icon</b>
                        <b className='text-center'>Actions</b>
                    </div>


                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block "><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_2fr_1fr_2fr] items-center gap-2 py-4 px-2 bg-white text-sm">
                        <p className="hidden sm:block"><button className="border mx-3 text-gray-700 px-2 bg-gray-200">-</button></p>
                        <p className="text-medium"><strong>Hundepension</strong></p>
                        <p className="text-medium hidden md:block"><strong>Hundepension</strong>  </p>
                        <img src="/blank.png" width="30px" alt="" className="hidden sm:block" />
                        <div className="flex justify-center w-full"><CiEdit className="bg-blue-200 p-2 rounded-3xl mx-2" size={30} color="blue" /> <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default page