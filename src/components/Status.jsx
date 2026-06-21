import React from 'react'

const Status = ({status = null}) => {
  const bgStatus = status 
    ? "flex justify-center items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 h-fit" 
   : "flex justify-center items-center gap-1.5 bg-red-50 border border-red-200 rounded-full px-3 py-1.5 h-fit"
  const dotColor = status 
    ? "w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#16a34a] animate-pulse" 
    : "w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#a31616] animate-pulse"
  const textColor = status 
    ? "text-[11px] font-semibold text-green-700" 
    : "text-[11px] font-semibold text-red-700"
  
  return (
    <div className={bgStatus}>
      <span className={dotColor}/>
      <span className={textColor}>{status ? status : "Offline"}</span>
    </div>
  )
}

export default Status