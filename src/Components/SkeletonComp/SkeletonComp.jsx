import React, { useContext } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from '../../Context/ThemeContext';

export default function SkeletonComp() {

  const {isDark} = useContext(ThemeContext)

  return (
      <div className="w-full min-h-screen">
             <h2 className="font-bold text-3xl font-poppins">
               <SkeletonTheme
                 baseColor={isDark ? "#2d2c3e" : "#f8fafc"}
                 highlightColor={isDark ? "#383750" : "#dbeafe"}
               >
                 <Skeleton width={200} />
               </SkeletonTheme>
             </h2>
             <div className="grid grid-cols-4 gap-5 mt-14">
               <div className="col-span-3 grid grid-cols-2 gap-x-3 gap-y-8 h-max">
                 {Array.from({ length: 8 }).map((_, index) => (
                   <SkeletonTheme
                     baseColor={isDark ? "#2d2c3e" : "#f8fafc"}
                     highlightColor={isDark ? "#383750" : "#dbeafe"}
                   >
                     <Skeleton key={index} height={50} width="100%" />
                   </SkeletonTheme>
                 ))}
               </div>
               <div className="col-span-1 border h-max p-5 rounded-2xl">
                 <SkeletonTheme
                   baseColor={isDark ? "#2d2c3e" : "#f8fafc"}
                   highlightColor={isDark ? "#383750" : "#dbeafe"}
                 >
                   <Skeleton circle={true} height={150} width={150} />
                   <Skeleton height={20} width="60%" className="mt-5" />
                 </SkeletonTheme>
                 {Array.from({ length: 6 }).map((_, index) => (
                   <SkeletonTheme
                     baseColor={isDark ? "#2d2c3e" : "#f8fafc"}
                     highlightColor={isDark ? "#383750" : "#dbeafe"}
                   >
                     <Skeleton
                       key={index}
                       height={20}
                       width="80%"
                       className="mt-3"
                     />
                   </SkeletonTheme>
                 ))}
               </div>
             </div>
           </div>
     );
}
