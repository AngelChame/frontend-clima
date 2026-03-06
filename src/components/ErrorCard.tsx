
interface ErrorCardProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorCard({
    message = "Error de conexión con el servicio de telemetría",
    onRetry,
}: ErrorCardProps) {
    return (
        <div
            role="alert"
            className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm"
        >
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                    >
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-red-800">
                        Fallo en la conexión SOA
                    </h3>
                    <p className="mt-1 text-sm text-red-600">{message}</p>
                    <p className="mt-2 text-xs text-red-400">
                        Verifica que el microservicio de telemetría esté activo y que la red
                        SOA sea accesible.
                    </p>
                </div>

                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 border border-red-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Desconectado
                </span>
            </div>

            {onRetry && (
                <div className="mt-5 flex justify-end">
                    <button
                        type="button"
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 .49-3.96" />
                        </svg>
                        Reintentar conexión
                    </button>
                </div>
            )}
        </div>
    );
}
