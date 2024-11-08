import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
// import upload from '../../../assets/images/upload.png'
const CreateProducts = ({ setOpenAddProduct}) => {

const onHandleCreate=()=>{
  setOpenAddProduct(false)
}
  return (
    
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-40 p-[40px] w-full z-50">
       <div className="block absolute top-[5%] right-[5%] cursor pointer">
            <RxCrossCircled style={{ fontSize: "25px", color: "red" }} onClick={onHandleCreate}/>
          </div>
      <div className='w-[300px] md:w-[700px] m-auto  p-10 bg-gray-100 h-[700px] overflow-scroll'>
        
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
          <div className='w-full'>
            <p className='mb-2'>Product Name</p>
            <input type="text" className='w-full max-w-[500px] px-3 py-2 ' placeholder='Type Here' required id="" />
          </div>
          <div className='w-full'>
            <p className='mb-2'>Product Number</p>
            <input type="text" className='w-full max-w-[500px] px-3 py-2 ' placeholder='Type Here' required id="" />
          </div>

          <div className='w-full'>
            <p className='mb-2'>Product Description</p>
            <textarea className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Description'></textarea>
          </div>
          <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
              <p className='mb-2'>Product Category</p>
              <select className='w-full px-3 py-2'>
                <option >HCPL COLUMNS</option>
                <option >ACCESSORIES</option>
                <option >SAFETY SYSTEM</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Product Price</p>
              <input className='p-1 px-3 ' type="Number" placeholder='25' />
            </div>
          </div>

          <button className='w-28 py-3 mt-4 bg-red-500 text-white ' type='submit'>ADD</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProducts