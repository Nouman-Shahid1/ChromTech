import React from 'react'
// import Acessories from '../../components/Navbar/Acessories'
// import Columns from '../../components/Navbar/Columns'
// import Insta from '../../components/Navbar/Insta'
// import Instrumentation from '../../components/Navbar/Instrumentation'
// import GCColom from '../../components/Navbar/GCColom'
// import Syringes from '../../components/Navbar/Syringes'




function page() {
  return (
    <div>
    <div className='w-[75%] mx-auto'>
    <div>
      <div className='flex'>
      <button className='font-thin'>Home / </button>
      <p>shop all category</p>
      </div>
      <h1 className='text-5xl flex  font-bold mt-10'>Shop All Categories</h1>
      <p className='mt-10'> Welcome to our Shop All Categories page! Explore our wide range of chromatography supplies, including vials, columns, syringes, and more. Easily find high-quality products from top brands to enhance your lab's performance.</p>
      <h1 className='text-3xl font-bold mt-10'>HPLC Accessories</h1>
      
    </div>
    {/* <Acessories/>
    <h1 className='text-3xl font-bold mt-10'>HPLC Columns</h1>
    <Columns/>
<h1 className='text-3xl font-bold mt-10'>Vials & Plates</h1>
<Insta/>
<h1 className='text-3xl font-bold mt-10'>Instrumentation</h1>
<Instrumentation/>
<h1 className='text-3xl font-bold mt-10'>GC Columns & Accessories</h1>
<GCColom/>
<h1 className='text-3xl font-bold mt-10'>Syringes</h1>
<Syringes/> */}

    </div>
    <div className='flex justify-center flex-col align-middle bg-purple-300'>
  <h1 className='text-3xl font-bold mt-10 flex justify-center'>Stay Connected And Stay Ahead</h1>
  <p className='flex justify-center mx-96'> Subscribe to Chromatography for a monthly update from our team of product specialist. 
    Each month we'll send updates avbout latest Chromatography trends our, best deals , and products spotlight</p>
    
</div>
    </div>
  )
}

export default page