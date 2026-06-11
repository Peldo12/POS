import React from 'react'
import '../index.css'

const Loading = () => {
  return (
    <div className="flex gap-3 h-10">
      <div className="w-5 h-5 rounded-full bg-amber-800 animate-bounce-1"></div>
      <div className="w-5 h-5 rounded-full bg-amber-400 animate-bounce-2"></div>
      <div className="w-5 h-5 rounded-full bg-amber-600 animate-bounce-3"></div>
    </div>
  )
}

export default Loading