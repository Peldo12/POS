import React from 'react'

const LabelNumber = ({label, num}) => {
  const isLowWarning = label.toLowerCase() === "low" && num > 0

  const sets = `flex flex-col w-full rounded p-2.5 text-center ${isLowWarning ? "bg-red-100" : "bg-green-100"}`
  return (
    <div className={sets}>
      <h3 className="text-sm">{label}</h3>
      <p className="text-3xl font-bold">{num}</p>
    </div>
  )
}

export default LabelNumber