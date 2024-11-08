import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
// import upload from '../../../assets/images/upload.png'
const EditProducts = ({ setOpenEditProduct }) => {

  const onHandleEdit = () => {
    setOpenEditProduct(false)
  }
  return (

    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-40 py-[200px]  w-full z-50">

      <div className='w-[300px] sm:w-[500px] rounded-xl md:w-[700px] m-auto  p-10 bg-white sm:h-[700px] overflow-hidden'>
        <div className="flex justify-between pb-6 border-b border-gray-400">
          <div>
            <p className='text-xl'><strong> Product</strong></p>
          </div>
          <div>
            <RxCrossCircled className='cursor-pointer' style={{ fontSize: "25px", color: "red" }} onClick={onHandleEdit} />
          </div>
        </div>
        <form className='flex flex-col py-8 w-full gap-3 items-start' >
          <div>
            <p className='mb-2'>Upload Image</p>
            <div className='flex gap-2'>
              <label htmlFor="image1">
                <img className='w-20' src="/upload.png" alt="" />
                <input type="file" id="" hidden />
              </label>
              <label htmlFor="image1">
                <img className='w-20' src="/upload.png" alt="" />
                <input type="file" id="" hidden />
              </label>
              <label htmlFor="image1">
                <img className='w-20' src="/upload.png" alt="" />
                <input type="file" id="" hidden />
              </label>
            </div>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div className='sm:w-1/2'>
            <p className='mb-2'>Product Name</p>
            <input type="text" className='w-[85%] border border-black rounded-lg max-w-[500px] px-2 py-1 ' placeholder='Type Here' required id="" />
          </div>
          <div className='sm:w-1/2'>
            <p className='mb-2 '>Product Number</p>
            <input type="text" className='w-[85%] max-w-[500px] border border-black rounded-lg px-2 py-1 ' placeholder='Type Here' required id="" />
          </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div className='sm:w-1/2'>
              <p className='mb-2 '>Product Category</p>
              <select className='w-[85%] px-2 py-1 border border-black rounded-lg'>
                <option >HCPL COLUMNS</option>
                <option >ACCESSORIES</option>
                <option >SAFETY SYSTEM</option>
              </select>
            </div>

            <div className='sm:w-1/2'>
              <p className='mb-2'>Product Price</p>
              <input className='w-[85%] px-2 py-1 border border-black rounded-lg ' type="Number" placeholder='25' />
            </div>
          </div>
          <div className='sm:w-full'>
            <p className='mb-2'>Product Description</p>
            <textarea className='w-[95%] min-h-[100px]  border border-black rounded-lg px-3 py-2' type="text" placeholder='Write Description'></textarea>
          </div>
          

          <button className='w-28 py-3 mt-4 bg-red-600 rounded-lg text-white ' type='submit'>ADD</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProducts