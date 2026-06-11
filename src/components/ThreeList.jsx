import React from 'react'

const ThreeList = ({first, second, third}) => {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 text-center hover:bg-amber-400">
      <span className="text-left">{first}</span>
      <span>{second}</span>
      <span>{third}</span>
    </div>
  )
}

export default ThreeList