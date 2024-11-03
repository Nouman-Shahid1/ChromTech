import Navbar from "../components/Navbar/Navbar.jsx"
import Link from 'next/link';

export default function Home() {
  return <>
    <div className="header-line">
      <p>Safety First, Coffee Second: Score a FREE coffee tumbler with the purchase of our safety waste containment kits! <span ><strong><a href=""><u>SHOP NOW</u></a></strong></span></p>
    </div>
    <Navbar />
    {/* banner */}
      
    <div className="banner">
    <Link href="/"> 
      <div className="banner-content">
        <h1>Chromatography Success Starts Here </h1>
        <div className="sub-content">
          <p>
            Buy from chromatography specialists so you can focus on breakthroughs instead of breaking away from your research
          </p>
        </div>
        <p className="banner-btn">SIGN IN / SIGN UP</p>
      </div>
      </Link>
    </div>
  </>;
}
