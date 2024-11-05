import Footer from "@/components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Link from 'next/link';
import Title from "@/components/Title/Title.jsx";
import Testimonialcard from "@/components/TestimonialCard/Testimonialcard.jsx";

export default function Home() {
  return (
    <>
      {/* Header Line */}
      <div className="fixed top-0 w-full bg-red-600 text-white text-center py-2 z-20 text-sm font-light">
        <p>
          Safety First, Coffee Second: Score a FREE coffee tumbler with the purchase of our safety waste containment kits!
          <span>
            <strong>
              <Link href="/" className="underline"><strong>SHOP NOW</strong></Link>
            </strong>
          </span>
        </p>
      </div>

      <Navbar hasHeadline={true} />

      {/* Banner */}

      <div className="h-[850px] md:h-[330px] w-full">
        <div className="relative bg-no-repeat h-[330px] top-[210px] bg-[url('../assets/images/bannerimg.png')] bg-right">
          <Link href="/">
            <div className="w-[75%] mx-auto text-black py-8 space-y-4 pt-[400px] md:text-white md:pt-8"  >
              <h1 className="text-4xl font-bold">Chromatography Success Starts Here</h1>
              <div className="text-xl font-light leading-relaxed max-w-md">
                <p>Buy from chromatography specialists so you can focus on breakthroughs instead of breaking away from your research</p>
              </div>
              <p className="inline-block border border-red-500 rounded-lg px-6 py-3 text-red-500 text-lg cursor-pointer mt-4 hover:bg-white hover:text-red-600 transition-colors md:text-white md:border-white">
                SIGN IN / SIGN UP
              </p>
            </div>
          </Link>
        </div>
      </div>s
      {/* Featured category */}
      <div className="mt-[200px]">
        <div className="text-center pt-8 text-3xl">
          <Title text1={'Latest Features'} /><div className="my-10 text-center">
            <Link href="/" className=" text-white p-2 px-2 text-xl rounded-lg" style={{ backgroundColor: '#FF0000' }}>
              <strong> SHOW ALL CATEGORIES</strong>
            </Link>
          </div>
        </div>
      </div>
      {/* Second Banner */}
      <div className="h-[1100px] md:h-[700px] lg:h-[600px] xl:h-[500px]">
        <div className=" h-[380px] bg-no-repeat bg-[url('../assets/images/bannerimg2.png')] bg-right">

          <Link href="/">
            <div className="w-[75%] mx-auto py-8 space-y-4 text-black pt-[400px] md:text-white md:pt-6  ">
              <h1 className="text-2xl font-light">Chromatography Success Starts Here</h1>
              <div className="text-2xl font-bold leading-relaxed max-w-md">
                <p>Buy from chromatography specialists so you can focus on breakthroughs instead of breaking away from your research</p>
              </div>
              <p className="inline-block rounded-lg px-10 py-3 text-xl cursor-pointer mt-4 bg-gray-800 text-white  md:text-white">
                <strong>About</strong>
              </p>
            </div>
          </Link>
          <div className="flex flex-wrap justify-between shadow-2xl items-center mt-[-10px] p-[20px] rounded-md bg-white w-[75%] m-auto xxl:h-[120px]">
            <div className="text-lg flex pt-8 xl:pt-2">
              <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/icon-proactive-ordering.png" width={'50px'} alt="" />
              <div>
                <p className="px-6">PRODUCT SELECTION GUIDANCE</p>
                <Link href='/' className="px-6">start here</Link>
              </div>
            </div>
            <div className="text-lg flex pt-8 xl:pt-2">
              <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/icon-nerds.png" width={'50px'} alt="" />
              <div >
                <p className="px-6">ELEVATED CUSTOMER EXPERIENCE</p>
                <Link href='/' className="px-6">Contact us</Link>
              </div>
            </div>
            <div className="text-lg flex pt-8 xl:pt-2">
              <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/icon-timelines.png" width={'50px'} alt="" />
              <div >
                <p className="px-6">CONVENIENT ONLINE ORDERING</p>
                <Link href='/' className="px-6">Register Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TESTIMONIAL  */}
      <div className="testimonial py-8 w-[75%] m-auto">
        <div className="text-red-500 text-2xl font-bold">TESTIMONIAL</div>
        <Title text1={'Our Customer Say'} />
        <Testimonialcard />
      </div>
      {/* manufacture */}
      <div className="text-center py-8 flex flex-col justify-start">
  <Title text1={'Manufacture'} />
  <div className="grid grid-cols-3 gap-4 w-[75%] mx-auto py-8">
    <div >
      <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/agilenthplogo.png?t=1700498413" alt="" className="w-full h-auto" />
    </div>
    <div >
      <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/idexhplogo.png?t=1700498426" alt="" className="w-full h-auto" />
    </div>
    <div >
      <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/hamiltonhplogo.png?t=1700498440" alt="" className="w-full h-auto" />
    </div>
    <div >
      <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/justritehplogo.png?t=1700498453" alt="" className="w-full h-auto" />
    </div>
    <div >
      <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/restekhplogo.png?t=1700498465" alt="" className="w-full h-auto" />
    </div>
    <div >
      <img src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/thermofisherhplogo.jpg?t=1702961280" alt="" className="w-full h-auto" />
    </div>
  </div>
</div>
{/* subscribe section */}
<div className="text-center py-8" style={{background: 'linear-gradient(to right, #FAF8F6, #C7B299)'}}>
  <Title text1={'Stay Connected And Stay Ahead'}/>
  <p className="py-8 flex flex-wrap m-auto text-sm w-full max-w-[700px]">
    Subscribe to Chromatography Connections for a monthly update from our team of product specialists. Each month, we’ll send updates about the latest chromatography trends, our best deals, and product spotlights.
  </p>
  <div className="bg-white flex max-w-[500px] border border-black m-auto px-8 mb-8 rounded-full justify-between">
    <input className="border-none outline-none py-3" type="email" placeholder="Enter Your Email Address" />
    <button className="outline-none cursor-pointer py-3 pl-4 border-l border-black">Subscribe</button>
  </div>
</div>

      <Footer />
    </>
  );
}
