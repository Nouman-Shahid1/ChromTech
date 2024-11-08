'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Pagination = () => {
  const [activePage, setActivePage] = useState(1); 

  const pages = [1, 2, 3, 4, 5];

  return (
    <ul className="inline-flex rounded-xl ">
        {activePage>1?
        <li>
        <Link
          href="/lc"
          onClick={() => setActivePage('previous')}
          className='flex items-center justify-center border px-3 h-8 text-black rounded-lg border-black  hover:cursor-pointer '
        >
          Previous
        </Link>
      </li>:''
}
      {pages.map(page => (
        <li key={page}>
          <Link
            href={`/lc?page=${page}`}
            onClick={() => setActivePage(page)}
            className={`flex items-center justify-center px-3 h-8 border text-gray-600 rounded-lg mx-1  border-gray-300 hover:cursor-pointer ${activePage === page ? 'text-xl text-gray-800 border-gray-800' : ''}`}
          >
            {page}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="/lc"
          onClick={() => setActivePage('next')}
          className='flex items-center justify-center px-3 h-8 text-black border border-black rounded-lg hover:cursor-pointer '
        >
          Next
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
