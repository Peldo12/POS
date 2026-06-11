import { Link } from 'react-router-dom'

export default function LabelLink({label, anchor, togo}) {
  return (
    <div className="flex justify-between">
      <p>{label} <Link to={anchor} >{togo}</Link></p>
    </div>
  )
}