'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Pagination = () => {
  const [activePage, setActivePage] = useState(1); // Track the active page

  const pages = [1, 2, 3, 4, 5];

  return (
    <ul className="inline-flex rounded-xl ">
        {activePage>1?
        <li>
        <Link
          href="/lc"
          onClick={() => setActivePage('previous')}
          className='flex items-center justify-center px-3 h-8 text-black   hover:cursor-pointer '
        >
          Previous
        </Link>
      </li>:''
}
      {pages.map(page => (
        <li key={page}>
          <Link
            href={`/lc?page=${page}`}
            onClick={() => setActivePage(page)} // Set the active page on click
            className={`flex items-center justify-center px-3 h-8 text-gray-600   border-b border-gray-200 hover:cursor-pointer ${activePage === page ? 'text-xl text-gray-800 border-gray-800' : ''}`}
          >
            {page}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="/lc"
          onClick={() => setActivePage('next')}
          className='flex items-center justify-center px-3 h-8 text-black  hover:cursor-pointer '
        >
          Next
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
