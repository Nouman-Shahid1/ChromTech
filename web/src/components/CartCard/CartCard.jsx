import React from 'react'

const CartCard = () => {
    return (
        <>
            <div className="flex justify-between items-center border m-2 p-1">
                <div>
                    <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/m1.jpg?t=1707154932" width={'50px'} alt="" />
                </div>
                <div className='p-1'>
                    <p>M1 Class
                        Single Piston
                    </p>
                    <div>
                        <button className='bg-black text-white text-lg px-2 mr-2'>-</button>
                        <span>0</span>
                        <button className='bg-black text-white text-lg px-1.5 ml-2'>+</button>
                    </div>
                </div>
                <div>
                    $:00.00
                </div>
            </div>
        </>
    )
}

export default CartCard