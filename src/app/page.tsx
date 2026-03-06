"use client";

import { useEffect, useState, useCallback } from "react";
import TelemetryTable from "@/components/TelemetryTable";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";
import { getTelemetryService } from "@/services/telemetry";
import { ApiError } from "@/services/api.service";
import type { TelemetryApiResponse } from "@/types/weather.types";

type Status = "loading" | "success" | "error";

export default function TelemetryPanel() {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<TelemetryApiResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [query, setQuery] = useState<string>("");       // lo que escribe el usuario
  const [activeCity, setActiveCity] = useState<string>(""); // ciudad que se consultó

  const loadData = useCallback(async (city?: string) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const response = await getTelemetryService(city || undefined);
      setData(response);
      setStatus("success");
    } catch (err) {
      if (err instanceof ApiError) setErrorMsg(err.message);
      else if (err instanceof Error) setErrorMsg(err.message);
      else setErrorMsg("Error de conexión con el servicio de telemetría");
      setStatus("error");
    }
  }, []);

  // Carga inicial con ciudad por defecto del .env
  useEffect(() => { loadData(); }, [loadData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setActiveCity(trimmed);
    loadData(trimmed);
  };

  const handleReset = () => {
    setQuery("");
    setActiveCity("");
    loadData();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-indigo-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">

        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-semibold text-sky-600 shadow-sm">
            <span className={`h-2 w-2 rounded-full ${status === "success" ? "bg-emerald-400 animate-pulse"
                : status === "loading" ? "bg-amber-400 animate-pulse"
                  : "bg-red-400"
              }`} />
            {status === "success" && "Servicio SOA · En línea"}
            {status === "loading" && "Servicio SOA · Conectando…"}
            {status === "error" && "Servicio SOA · Sin conexión"}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
            Panel de Telemetría Climática
            <span className="text-sky-600"> — SOA</span>
          </h1>

          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Visualización de datos meteorológicos en tiempo real a través de servicios independientes.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Buscar ciudad
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: Ciudad de México, MX"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !query.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Buscar
            </button>

            {activeCity && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Limpiar
              </button>
            )}
          </form>

          {activeCity && status !== "loading" && (
            <p className="mt-3 text-xs text-slate-500">
              Mostrando resultados para:{" "}
              <span className="font-semibold text-sky-600">{activeCity}</span>
            </p>
          )}
        </section>

        <section>
          {status === "loading" && <Loader />}
          {status === "success" && data && (
            <TelemetryTable city={data.city} updatedAt={data.updatedAt} rows={data.rows} />
          )}
          {status === "error" && (
            <ErrorCard
              message={errorMsg || "Error de conexión con el servicio de telemetría"}
              onRetry={() => loadData(activeCity || undefined)}
            />
          )}
        </section>

        <footer className="text-center text-xs text-slate-400 pb-4">
          UPChiapas · AWOS · Cuatrimestre 5 · Arquitectura Orientada a Servicios
        </footer>
      </div>
    </main>
  );
}
