'use client';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React, { useState } from 'react';

const Page = () => {
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100; 
        const y = ((e.clientY - top) / height) * 100; 
        setPosition({ x, y });
    };

    return (
        <>
            <Navbar />
            <div className="w-[80%] mx-auto pt-[200px] mt-[30px]">
                <p className="my-5 py-6">Home /</p>
                <div className="flex flex-col md:flex-row p-7 rounded ">
                    <div
                        className="relative w-[300px] h-[300px] overflow-hidden"
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/320w/products/23071/8397/xp-201-flngls-sys-black-delrin-116in__22020.1729098686.jpg?c=1"
                            alt="Product"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-150"
                            style={{
                                transformOrigin: `${position.x}% ${position.y}%`,
                            }}
                        />
                    </div>

                    <div className="w-1/2 px-4">
                        <p className="text-3xl font-bold">Product Name</p>
                        <p className="text-2xl font-bold">SubTitle</p>
                        <p className="py-3">Price: $99</p>
                        <div>
                            <p className="py-3">Quantity</p>
                            <button className="bg-black text-white text-lg px-2 outline-none border-none mr-2 rounded-md">-</button>
                            <span>1</span>
                            <button className="bg-black outline-none border-none text-white text-lg px-1.5 ml-2 rounded-md">+</button>
                        </div>
                        <button className="my-5 py-4 px-5 outline-none border-none rounded bg-black text-white">
                            ADD TO CART
                        </button>
                    </div>
                </div>

                {/* Description */}
                <div className="my-6 mx-3">
                    <h1 className="text-3xl font-bold">Product Details</h1>
                    <p className="my-3">This is a product description.</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;
