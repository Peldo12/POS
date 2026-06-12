export default function FieldInput({ label, name, type = "text", value, onChange, error, success, hint, icon, ...props }) {
  const borderClass = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
    : success
    ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10"
    : "border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/10";

  const labelFloated = `
    peer-focus:top-2 peer-focus:translate-y-0
    peer-focus:text-[10px] 
    peer-focus:font-medium 
    peer-focus:tracking-wider 
    peer-focus:uppercase
    peer-[:not(:placeholder-shown)]:top-2
    peer-[:not(:placeholder-shown)]:translate-y-0 
    peer-[:not(:placeholder-shown)]:text-[10px] 
    peer-[:not(:placeholder-shown)]:font-medium 
    peer-[:not(:placeholder-shown)]:tracking-wider 
    peer-[:not(:placeholder-shown)]:uppercase
  `;

  const labelColor = error
    ? "peer-focus:text-red-400 peer-[:not(:placeholder-shown)]:text-red-400"
    : success
    ? "peer-focus:text-emerald-400 peer-[:not(:placeholder-shown)]:text-emerald-400"
    : "peer-focus:text-indigo-400 peer-[:not(:placeholder-shown)]:text-indigo-400";

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer rounded-xl bg-zinc-900 ${borderClass} border px-4 pt-5 pb-2 text-sm text-zinc-100 outline-none transition-all focus:ring-2 placeholder-transparent ${icon ? "pr-10" : ""}`}
        {...props}
      />
      <label className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 transition-all ${labelFloated} ${labelColor}`}>
        {label}
      </label>
      {icon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600">{icon}</span>
      )}
      {(error || success || hint) && (
        <p className={`mt-1.5 px-1 text-xs ${error ? "text-red-400" : success ? "text-emerald-400" : "text-zinc-500"}`}>
          {error || success || hint}
        </p>
      )}
    </div>
  );
}