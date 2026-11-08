"use client"
import Image from 'next/image'
import Navlinks from './Navlinks';
import Marquee from './Marquee';
import Link from 'next/link';
import { signOut, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { usePathname } from 'next/navigation';
import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';

const Header = () => {
  const { data: session, isPending } = useSession();
  const pathname = usePathname()

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  if (isPending) {
    return <div className="text-center py-8">
      <span className="loading loading-bars loading-lg"></span>

    </div>
  }


  const button = <>{
    <div className="flex items-center gap-1 sm:gap-2">
      <Link href="/sign-in">
        <button
          className={`px-3 sm:px-4 py-2 rounded-xl font-medium cursor-pointer text-sm sm:text-base ${pathname === "/sign-in" ? "bg-green-700 text-white  shadow-lg shadow-green-700/20" : ""}`}
        >
          সাইন ইন
        </button>
      </Link>
      <Link href="/sign-up">
        <button
          className={`px-3 sm:px-4 py-2 rounded-xl font-medium cursor-pointer text-sm sm:text-base ${pathname === "/sign-up" ? "bg-green-700 text-white shadow-lg shadow-green-700/20" : ""}`}
        >
          সাইন আপ
        </button>
      </Link>
    </div>
  }</>

  return (
    <div className='py-4 bg-base-200'>
      <div className='max-w-6xl mx-auto px-3 sm:px-5 lg:px-0 flex justify-between items-center gap-2'>
        <div className='flex gap-2 items-center min-w-0'>
          <Link href={"/"}>
            <Image src={"/logo-icon.png"} width={40} height={20} alt='logo' className='bg-green-500 rounded-lg p-1'></Image>
          </Link>
          <div className='min-w-0'>
            <h3 className='text-lg sm:text-xl font-bold'> বাজার দর </h3>
            <span className='text-xs sm:text-sm'> {date} </span>
          </div>
        </div>

        <div className='shrink-0'>
          {
            session?.user ? (
              <div>
                <ProfileDropdown user={session?.user}></ProfileDropdown>
              </div>
            ) : (
              button
            )
          }
        </div>
      </div>

      <div className='border-t border-gray-100 mt-4'>
        <div className='max-w-6xl mx-auto px-3 sm:px-5 lg:px-0 overflow-x-auto'>
          <Navlinks />
        </div>
      </div>

      <div className='border-y border-gray-200'>
        <Marquee></Marquee>
      </div>
    </div>
  )
}

export default Header