"use client";
import Authentication from "@/components/Authentication";
import Sidebar from "@/components/Sidebar/Sidebar";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Authentication>
          <Sidebar />
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md sm:ml-[370px]">
            {children}
          </div>
        </Authentication>
      </body>
    </html>
  );
}
