"use client";

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const path=usePathname();
  useEffect(()=>{

  },[])

  return (
    <div className='flex p-4 items-center justify-between px-0 bg-secondary shadow-sm'>
        <div className='flex flex-row items-center'>
          <Image src={'/logo.svg'} width={30} height={30} alt='logo' className='cursor-pointer'/>
          <span className='text-blue-800 font-extrabold text-lg cursor-pointer'> MockMateAI</span>
        </div>

       <ul className='hidden md:flex gap-6 px-10 items-center'>
         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard' && 'text-primary font-bold'}
          `}>Dashboard</li>

          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/questions' && 'text-primary font-bold'}
          `}>Questions</li>

          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/upgrade' && 'text-primary font-bold'}
          `}>Upgrade</li>

          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/how' && 'text-primary font-bold'}
          `}>How it works?</li>
       </ul>
       <UserButton/>
    </div>
    
  )
}

export default Header