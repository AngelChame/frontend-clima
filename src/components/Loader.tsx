
export default function Loader() {
    return (
        <div className="w-full space-y-4" role="status" aria-label="Cargando datos de telemetría">
            
            <div className="flex justify-center py-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
            </div>

            
            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                
                <div className="bg-gradient-to-r from-sky-100 to-indigo-100 px-6 py-4 space-y-2">
                    <div className="h-3 w-36 animate-pulse rounded-full bg-sky-200" />
                    <div className="h-2.5 w-48 animate-pulse rounded-full bg-sky-100" />
                </div>

                <div className="flex gap-4 bg-slate-50 px-6 py-3 border-b border-slate-200">
                    <div className="h-3 w-40 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
                </div>

                
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-6 px-6 py-4 border-b border-slate-100 ${i % 2 === 0 ? "bg-slate-50/60" : "bg-white"
                            }`}
                    >
                        
                        <div className="h-5 w-5 animate-pulse rounded-full bg-slate-200 shrink-0" />
                        
                        <div
                            className="h-3.5 animate-pulse rounded-full bg-slate-200"
                            style={{ width: `${140 + i * 12}px` }}
                        />
                        
                        <div className="ml-auto h-3.5 w-24 animate-pulse rounded-full bg-indigo-100" />
                    </div>
                ))}

                
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
                    <div className="h-2.5 w-56 animate-pulse rounded-full bg-slate-200" />
                </div>
            </div>

            <p className="text-center text-sm text-slate-400 animate-pulse">
                Conectando con el servicio de telemetría…
            </p>
        </div>
    );
}
