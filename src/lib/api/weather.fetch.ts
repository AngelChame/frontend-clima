import type { OWMResponse } from "@/types/weather.types";

function requireEnv(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Variable de entorno faltante: ${key}. Agrégala a .env.local`);
    return value;
}

export async function weatherFetch(city?: string): Promise<OWMResponse> {
    const BASE_URL = requireEnv("OWM_BASE_URL");
    const API_KEY = requireEnv("OWM_API_KEY");
    const DEFAULT_CITY = requireEnv("OWM_CITY");

    const url = new URL(`${BASE_URL}/weather`);
    url.searchParams.set("q", city ?? DEFAULT_CITY);
    url.searchParams.set("appid", API_KEY);
    url.searchParams.set("units", "metric");
    url.searchParams.set("lang", "es");

    const res = await fetch(url.toString(), { cache: "no-store" });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
            body?.message ?? `OpenWeatherMap respondió ${res.status}: ${res.statusText}`
        );
    }

    return res.json() as Promise<OWMResponse>;
}
