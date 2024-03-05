import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <nav className='flex w-screen p-5 pb-6 items-center bg-white shadow-sm text-sm sm:text-base'>
      <Link
        href='/'
        className='font-black sm:text-xl md:text-2xl hover:text-slate-600 w-[70%] sm:min-w-max'
      >{`HobbyHub`}</Link>
      <div className=' w-full flex gap-3 justify-end items-center font-semibold'>
        <Link href='/' className='hover:text-slate-600'>
          Home
        </Link>
        <Link href='/post' className='hover:text-slate-600'>
          Create New Post
        </Link>
      </div>
    </nav>
  );
}
