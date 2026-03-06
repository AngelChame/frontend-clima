
import { apiFetch } from "@/services/api.service";
import type { TelemetryApiResponse } from "@/types/weather.types";

export const getTelemetryService = async (city?: string): Promise<TelemetryApiResponse> => {
    const endpoint = city
        ? `/weather?city=${encodeURIComponent(city)}`
        : "/weather";
    return apiFetch<TelemetryApiResponse>(endpoint);
};
