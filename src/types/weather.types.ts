// types/weather.types.ts
// Tipos TypeScript para la respuesta de OpenWeatherMap /weather endpoint.


export interface OWMMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;      
    humidity: number;      
    sea_level?: number;
    grnd_level?: number;
}

export interface OWMWind {
    speed: number;   
    deg: number;
    gust?: number;
}

export interface OWMWeatherDesc {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface OWMSys {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface OWMClouds {
    all: number; 
}

export interface OWMResponse {
    name: string;
    visibility: number; 
    main: OWMMain;
    wind: OWMWind;
    clouds: OWMClouds;
    weather: OWMWeatherDesc[];
    sys: OWMSys;
    dt: number;
    cod: number;
}


export interface TelemetryApiResponse {
    city: string;
    updatedAt: string;   
    rows: TelemetryWeatherRow[];
}

export interface TelemetryWeatherRow {
    parameter: string;
    value: string;
    unit: string;
    icon: string;
}
