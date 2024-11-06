import React from 'react'

const ProductCard = () => {
  return (
    <>
      <div className=" w-[290px] flex flex-wrap flex-cols">
  <div className="rounded-3xl my-4 py-4 bg-white border border-gray-300 m-auto w-full flex justify-center">
    <img 
      src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/200x200/products/32610/17858/Safety5pp__82369.1729098787.PNG?c=1" 
      width={'60%'}       alt="" 
    />
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