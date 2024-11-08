import React from 'react';
import Title from '../Title/Title'
import CategoryCard from '../CategoryCard/CategoryCard';

const MenuPage = ({data}) => {
  return (
    <>
        
      <div className="pt-[220px] w-[75%] m-auto">
        <p className="text-gray-400 py-8">Home/</p>
        <div>
          <Title text1="LC" />
        </div>
        <div className="flex gap-5 py-3 flex-col sm:flex-row">
          {data.map((item, index) => (
            <CategoryCard key={index} title={item.title} img={item.img} subTitle={item.subTitle} />
          ))}
        </div>

        <div className="py-6">
          <p className="font-bold pb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ color: "#4e4e4e" }}>
            LC Consumables & Accessories
          </p>
          <p>
            Discover the Chrom Tech difference with our complete line of LC consumables and accessories. From HPLC fittings
            to instrument replacement parts and everything in between, we offer high performance options so that your lab
            can operate consistently and efficiently. We also feature HPLC columns from top manufacturers including Agilent,
            Restek, and Thermo. Our product specialists are ready to help you discover our broad portfolio of LC consumables.
          </p>
        </div>
      </div>
    </>
  )
}

export default MenuPage