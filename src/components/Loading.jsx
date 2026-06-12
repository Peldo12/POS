import React from 'react'
import '../index.css'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center gap-2.5">
      <div className="size-3 rounded-full bg-green-500 animate-bounce"></div>
      <div className="size-3 rounded-full bg-green-700 animate-bounce [animation-delay:150ms]"></div>
      <div className="size-3 rounded-full bg-green-900 animate-bounce [animation-delay:300ms]"></div>
    </div>
  )
}

export default Loading