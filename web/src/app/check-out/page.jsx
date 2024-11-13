import React from 'react'

const Checkout = () => {
    return (
        <div className="bg-gray-100 h-screen"> 
        <form className='flex flex-col md:w-[75%] h-screen py-10 m-auto sm:flex-row justify-between gap-4 py-10 sm:pt-14 min-h-[80vh] border-t'>
            <div className='flex flex-col gap-4 w-full  md:max-w-[700px] p-10' >
                <div className='text-xl sm:text-2xl my-3'>
                    <div className='py-3'>
                        <p className='text-3xl font-bold'>
                            Delivery Information
                        </p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <input className='border border-black rounded py-3 px-3.5 w-full ' type="text" placeholder='First Name' name="firstName" id="" required />
                    <input className='border border-black rounded py-3 px-3.5 w-full ' type="text" placeholder='Last Name' name="lastName" id="" required />
                </div>
                <input className='border border-black rounded py-3 px-3.5 w-full ' type="email" placeholder='Email' name="email" id="" required />
                <input className='border border-black rounded py-3 px-3.5 w-full ' type="text" placeholder='Street' name="street" id="" required />
                <div className='flex gap-3'>
                    <input className='border border-black rounded py-3 px-3.5 w-full ' type="text" placeholder='City' name="city" id="" required />
                    <input className='border border-black rounded py-3 px-3.5 w-full ' type="text" placeholder='State' name="state" id="" required />
                </div>
                <div className='flex gap-3'>
                    <input className='border border-black rounded py-3 px-3.5 w-full ' type="number" placeholder='Zip Code' name="zipcode" id="" />
                    <input className='border border-black rounded py35 px-3.5 w-full ' type="text" placeholder='Country' name="country" id="" required />
                </div>
                <input className='border border-black rounded py-3 px-3.5 w-full ' type="number" placeholder='Phone Number' name="phone" id="" required />

            </div>
            {/* rightside */}
            <div className='p-10'>
                
                <div className='my-12 w-[90%]'>
                    <div className='py-3'>
                        <p className='text-3xl font-bold'>
                        Cart Total
                        </p>
                    </div>
                    <div className='flex flex-col  gap-2 mt-6 '>
                        <div className='flex justify-between'>
                            <p>SubTotal</p>
                            <p>00.00</p>
                        </div>
                        <hr class="border-black"/>
                        <div className='flex justify-between'>
                            <p>Tax</p>
                            <p>$00.00</p>
                        </div>
                        <hr class="border-black"/>
                        <div className='flex justify-between'>
                            <p>Shipping Fee</p>
                            <p>$00.00</p>
                        </div>
                        <hr class="border-black"/>
                        <div className='flex justify-between'>
                            <b>Total</b>
                            <b>00.00</b>
                        </div>
                    </div>
                    <div className='flex gap-3 flex-col lg:flex-row mt-7'>
                        <div className='flex items-center gap-3 border border-black rounded-md p-2 px-3 cursor-pointer text-sm'>
                            <p className='min-w-3.5 h-3.5 border border-black rounded-full' ></p>
                            {/* <img src="" alt="" /> */}
                            <p>Stripe</p>
                        </div>
                        <div on className='flex items-center gap-3 border border-black rounded-md p-2 px-3 cursor-pointer text-sm'>
                            <p className='min-w-3.5 h-3.5 border border-black rounded-full' ></p>
                            {/* <img src="" alt="" /> */}
                            <p>Razorpay</p>
                        </div>
                        <div className='flex items-center gap-3 border border-black rounded-md p-2 px-3 cursor-pointer text-sm'>
                            <p className='min-w-3.5 h-3.5 border border-black rounded-full'></p>
                            <p className=''>Cash on Delivery</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-red-600 rounded-md text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}

export default Checkout