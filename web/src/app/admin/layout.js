"use client";
import Authentication from "@/components/Authentication";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        {/* <Authentication> */}
          <AdminSidebar text={'Create Product'} text1={'LC'} text2={'GC'} text3={'INSTRUCTION'} text4={'SIGN OUT'} img={false} />
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md md:ml-[370px]">
            {children}
          </div>
        {/* </Authentication> */}
      </body>
    </html>
  );
}
