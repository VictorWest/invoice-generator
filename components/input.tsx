export default function Input({type="text", label, placeholder="Type something", className, ...props}:{ type?:string, label?:string, placeholder:string, className?:string }){
    return(
        <div className="flex items-center gap-5 text-xs">
            {label && <p className="w-20">{label}</p>}
            <input 
                type={type}
                className={`px-2 py-3 rounded-md outline-0 border border-stone-400 w-full ${className}`} 
                placeholder={placeholder} 
                {...props}
            />
        </div>
    )
}