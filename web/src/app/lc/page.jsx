import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import RelatedProducts from '@/components/relatedProducts/RelatedProducts';
import Title from '@/components/Title/Title';
import React from 'react';

const LC = () => {
  let lc = [
    {
      title: "LC COLUMNS",
      img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lccolumns.jpg?t=1708457490",
      subTitle: "HPLC and UHPLC Columns"
    },
    {
      title: "ACCESSORIES",
      img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lcaccess.jpg?t=1708457525",
      subTitle: "Fitting, Tubing, and Accessories"
    },
    {
      title: "SAFETY SYSTEM",
      img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/safetykit2.jpg?t=1708457735",
      subTitle: "HPLC Solvent Safety System"
    },
  ];

  return (
    <>
      <Navbar hasHeadline={true} />
      <div className="pt-[220px] w-[75%] m-auto">
        <p className="text-gray-400 py-8">Home/</p>
        <div>
          <Title text1="LC" />
        </div>
        <div className="flex gap-5 py-3 flex-col sm:flex-row">
          {lc.map((item, index) => (
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
      <RelatedProducts/>
      <Footer />
    </>
  );
};

export default LC;
