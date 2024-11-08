'use client'
import Profile from '@/components/Profile/Profile'
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import CreateProducts from '../CreateProducts/CreateProducts';
import DeleteProduct from '../DeleteProduct/DeleteProduct';

const ProductTable = () => {
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [openDelProduct, setOpenDelProduct] = useState(false)
    const [openEditProduct, setOpenEditProduct] = useState(false)

    const handleCreate = () => {
        setOpenAddProduct(true);
    }
    const handleEdit=()=>{
        setOpenEditProduct(true)
    }
    const handleDelete=()=>{
        setOpenDelProduct(true)
    }
    return (
        <>
            <div className="bg-gray-100 p-8">
                <Profile />
                
                {openEditProduct
                    ?
                    <CreateProducts setOpenAddProduct={setOpenEditProduct} />
                    :
                    ''
                }
                {openDelProduct
                    ?
                    <DeleteProduct setOpenDelProduct={setOpenDelProduct} />
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

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-4 px-3 text-left">Title</th>
                                <th className="py-4 px-2 text-left">Slug</th>
                                <th className="py-4 px-2 text-left">Icon</th>
                                <th className="py-4 px-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(10).fill().map((_, index) => (
                                <tr key={index} className="border-b">

                                    <td className="py-4 px-3 font-medium"><strong>Hundepension</strong></td>
                                    <td className="py-4 px-2 font-medium">Hundepension</td>
                                    <td className="py-4 px-2 text-center">
                                        <img src="/blank.png" width="30" alt="icon" />
                                    </td>
                                    <td className="py-4 px-2 flex justify-center gap-2">
                                        <CiEdit className="bg-blue-200 p-2 rounded-3xl" size={30} color="blue" onClick={handleEdit} />

                                        <FaTrash className="bg-red-200 p-2 rounded-3xl" size={30} color="red" onClick={handleDelete}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductTable