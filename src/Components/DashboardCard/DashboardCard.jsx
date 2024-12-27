import React, { useContext } from 'react'
import { ThemeContext } from '../../Context/ThemeContext'

export default function DashboardCard({src,title,content}) {

const {isDark} = useContext(ThemeContext)

  return (
    <div className={` ${isDark?'bg-[#252436] border-[#2A2A3C]':'bg-white'} border flex max-w-[309px]  flex-grow rounded-2xl py-5 px-3 space-x-2 items-center`}>
        <img
        className='w-14'
        src={src}  alt="" />
        <div>
          <p className='font-inter opacity-65 text-base'>{title}</p>
          <p className='font-poppins text-xl font-semibold'>{content}</p>
        </div>
    </div>
  )
}
