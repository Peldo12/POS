export default function Button({click, children}) {
  return (
    <button
    className="min-w-[100px] px-4 py-3.5 text-sm rounded-lg bg-violet-500 hover:bg-violet-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
    onClick={click}
    >{children ? children : "no-text"}</button>
  )
}