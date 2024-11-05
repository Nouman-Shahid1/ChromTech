"use client";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md sm:ml-[370px]">
        {children}
      </div>
    </>
  );
}
