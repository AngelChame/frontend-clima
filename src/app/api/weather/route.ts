// app/api/weather/route.ts
// Route Handler de Next.js — proxy interno entre el cliente y OpenWeatherMap.


import { NextRequest, NextResponse } from "next/server";
import { weatherFetch } from "@/lib/api/weather.fetch";
import type { TelemetryApiResponse } from "@/types/weather.types";

export async function GET(request: NextRequest) {
    // Leer ciudad desde ?city=... o usar la default del .env.local
    const city = request.nextUrl.searchParams.get("city") ?? undefined;

    try {
        const data = await weatherFetch(city);

        // Convertir velocidad de viento m/s a km/h
        const windKmh = (data.wind.speed * 3.6).toFixed(1);
        // Convertir visibilidad m a km
        const visKm = (data.visibility / 1000).toFixed(1);

        const response: TelemetryApiResponse = {
            city: `${data.name}, ${data.sys.country}`,
            updatedAt: new Date(data.dt * 1000).toISOString(),
            rows: [
                { parameter: "Humedad Relativa", value: String(data.main.humidity), unit: "%", icon: "💧" },
                { parameter: "Presión Atmosférica", value: data.main.pressure.toFixed(2), unit: "hPa", icon: "🌡️" },
                { parameter: "Velocidad del Viento", value: windKmh, unit: "km/h", icon: "🌬️" },
                { parameter: "Visibilidad", value: visKm, unit: "km", icon: "👁️" },
            ],
        };

        return NextResponse.json(response);
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Error de conexión con el servicio de telemetría";
        return NextResponse.json({ message }, { status: 502 });
    }
}
