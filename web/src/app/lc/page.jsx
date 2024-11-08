import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import RelatedProducts from '@/components/relatedProducts/RelatedProducts';
import React from 'react';
import MenuPage from '@/components/MenuPage/MenuPage';

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
      <MenuPage data={lc}/>
      <RelatedProducts/>
      <Footer />
    </>
  );
};

export default LC;
