import React from 'react'

const CategoryCard = ({ title, img, subTitle }) => {
    return (
        <>
            <div className="w-[200px] text-center rounded-lg py-4 my-3 hover:border border-red-500" style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)'}}>
                <p className='my-4 text-sm'><strong>{title}</strong></p>
                <div className="text-center w-[80%] m-auto border-b border-gray-400">
                    <img className='' src={img} width={'80%'} alt="" />
                </div>
                <p className='mt-4 text-sm'>{subTitle}</p>
            </div>
        </>
    )
}

export default CategoryCard