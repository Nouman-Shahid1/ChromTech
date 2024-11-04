
'use client'
import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import Link from 'next/link';
const Navbar = ({ hasHeadline }) => {
  console.log("hassHaedline", hasHeadline)
  const [showSubNav, setShowSubNav] = useState(true);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowSubNav(false);
      } else {
        setShowSubNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
    setShowSubNav(!showSubNav);
  };
  const closeSubNav = () => {
    setIsHamburgerOpen(false);
    setShowSubNav(false);
  };

  return (
    <nav>
      <div
        className={`navbar ${hasHeadline ? 'with-headline' : 'no-headline'}`}
        style={{ top: hasHeadline ? '40px' : '0px' }}
      >

        <div className="main-nav">
          <div className={`hamburger ${!showSubNav ? 'show' : ''}`} onClick={toggleHamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="logo">
            <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/245x80/2023chromtechlogo_1675205357__83333.original.png" alt="Logo" />
          </div>
          <div className="search-bar">
            <button className="search-icon">
              <CiSearch />
            </button>
            <input type="text" placeholder="What are you looking for?" />
          </div>
          <div className="header-btn">
            <Link href="">
              REQUEST A QUOTE
            </Link>
          </div>
          <div className="nav-sign">
            <FaRegUser style={{ fontSize: '20px', paddingLeft: '5px', paddingTop: '5px' }} />
            <span>| Sign in or Register |</span>
            <CiShoppingCart style={{ fontSize: '20px', paddingLeft: '5px', paddingTop: '5px' }} /> (0)
          </div>
        </div>
      </div>
      <hr style={{ border: '1px solid lightgray' }} />

      {/* Sub-nav with conditional rendering */}
      {(showSubNav || isHamburgerOpen) && (
        <div className={`sub-nav ${isHamburgerOpen ? 'active' : ''}`}>
          <div className="cross" onClick={toggleHamburger}>
          <RxCrossCircled style={{fontSize:'25px', color:'wheat'}}/>
          </div>
          <div className="sub-nav-menu">
          <div className="sub-nav-sign">
            <div className="sub-nav-icon" >
              <FaRegUser style={{ fontSize: '20px', paddingLeft: '5px', paddingTop: '3px' }} />
            </div>
            <div className="sub-nav-head">
              <span>| Sign in or Register |</span>
            </div>
          </div>
          <ul>
            <li><Link href="/">VIALS & 96 WELL Plates</Link></li>
            <li><Link href="/">LC</Link></li>
            <li><Link href="/">GC</Link></li>
            <li><Link href="/">INSTRUMENTATION</Link></li>
            <li><Link href="/">SYRINGERS</Link></li>
            <li><Link href="/">SAMPLE PREPARATIONS</Link></li>
            <li><Link href="/">SUPPORT</Link></li>
          </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar; 