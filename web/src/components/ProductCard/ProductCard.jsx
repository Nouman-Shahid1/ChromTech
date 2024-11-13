import React from 'react'

const ProductCard = () => {
  return (
    <>
      <div className=" w-[230px] sm:w=[290px] h-[350px] overflow-hidden flex flex-wrap flex-col m-auto">
        <div className="rounded-3xl my-4 py-4 h-[200px]  group hover:h-[240px] bg-white border border-gray-300 m-auto w-full flex justify-center flex-col">
          <div className='m-auto'>
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/200x200/products/32610/17858/Safety5pp__82369.1729098787.PNG?c=1"
              width={'60%'} alt=""
            />
          </div>
          <div className='flex pt-8 px-4 justify-between  hidden group-hover:block '>
            <div className='border border-black p-1 text-sm cursor-pointer text-center'>Quick View</div>
            <div className='bg-black border border-black text-white text-sm cursor-pointer mt-2 text-center p-1'>Add To Cart</div>
          </div>
        </div>
        <p className='text-sm text-red-500'>
          <strong>SAFETY-5PP-E - 5 GAL SOLVENT WASTE CONTAINMENT SYSTEM W/ELBOW</strong>
        </p>
        <p className='text-gray-500'>$699.00</p>
        <p className='text-gray-500'>Chrome Tech</p>
      </div>

    </>
  )
}

export default ProductCard