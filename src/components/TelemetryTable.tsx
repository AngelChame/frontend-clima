import type { TelemetryWeatherRow } from "@/types/weather.types";

interface TelemetryTableProps {
    city?: string;
    updatedAt?: string;
    rows: TelemetryWeatherRow[];
}

export default function TelemetryTable({ city, updatedAt, rows }: TelemetryTableProps) {
    const formattedDate = updatedAt
        ? new Intl.DateTimeFormat("es-MX", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(updatedAt))
        : "—";

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            
            <div className="bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-100">
                    {city ?? "Reporte en tiempo real"}
                </p>
                <p className="mt-0.5 text-sm text-white/70">
                    Última actualización: {formattedDate}
                </p>
            </div>

            <table className="w-full table-fixed text-sm">
                <thead>
                    <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <th className="w-1/2 px-6 py-3 border-b border-slate-200">
                            Parámetro Técnico
                        </th>
                        <th className="w-1/2 px-6 py-3 border-b border-slate-200">
                            Valor Reportado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr
                            key={row.parameter}
                            className={`transition-colors duration-150 hover:bg-sky-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                                }`}
                        >
                            <td className="px-6 py-4 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    {row.icon && (
                                        <span className="text-base leading-none" aria-hidden="true">
                                            {row.icon}
                                        </span>
                                    )}
                                    <span className="font-medium text-slate-700">
                                        {row.parameter}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 border-b border-slate-100">
                                <span className="font-mono text-indigo-700 font-semibold">
                                    {row.value}
                                </span>
                                {row.unit && (
                                    <span className="ml-1 text-xs text-slate-400">{row.unit}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
                <p className="text-xs text-slate-400">
                    Fuente: OpenWeatherMap · Servicio SOA de Telemetría Climática
                </p>
            </div>
        </div>
    );
}
