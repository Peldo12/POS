export default function Button({click, warning, children}) {
  const status = warning ? "bg-red-500 hover:bg-red-300" : "bg-violet-500 hover:bg-violet-300"
  return (
    <button
    className={`min-w-[100px] px-4 py-3.5 text-sm rounded-lg ${status} transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
    onClick={click}
    >{children ? children : "no-text"}</button>
  )
}