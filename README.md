# Panel de Telemetría Climática — SOA

Interfaz web para visualizar datos meteorológicos en tiempo real, integrando la API de **OpenWeatherMap** mediante una arquitectura orientada a servicios (SOA) desacoplada.


## Características

- 🌤️ Datos en tiempo real: Humedad, Presión Atmosférica, Velocidad del Viento y Visibilidad
- 🔍 Búsqueda de cualquier ciudad del mundo
- ⏳ Estado de carga con **Skeleton Screen** 
- ❌ Manejo de errores con banner amigable y botón de reintento
- 🔒 API key protegida — nunca expuesta al navegador (proxy interno con Route Handler)
- 📱 Diseño responsivo

---

## Arquitectura de capas (SOA)

```
Navegador
  └─ page.tsx
       └─ services/telemetry.ts        ← servicio delgado
            └─ services/api.service.ts ← cliente HTTP central
                 └─ /api/weather (Route Handler) ← SERVIDOR
                      └─ lib/api/weather.fetch.ts
                           └─ api.openweathermap.org
                                └─ .env.local (OWM_API_KEY) ← nunca sale del servidor
```

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router + Route Handlers) |
| React | 19 | UI |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 4 | Estilos |
| OpenWeatherMap | v2.5 | API de datos climáticos |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── api/weather/route.ts   # Route Handler — proxy seguro a OWM
│   ├── layout.tsx
│   └── page.tsx               # Página principal con buscador
├── components/
│   ├── TelemetryTable.tsx     # Tabla de datos climáticos
│   ├── Loader.tsx             # Skeleton screen + spinner
│   └── ErrorCard.tsx          # Banner de error amigable
├── lib/api/
│   └── weather.fetch.ts       # Fetcher de bajo nivel (solo servidor)
├── services/
│   ├── api.service.ts         # Cliente HTTP central (apiFetch + ApiError)
│   └── telemetry.ts           # Servicio de telemetría
└── types/
    └── weather.types.ts       # Tipos TypeScript para OWM y la UI
```

---

## Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/AngelChame/frontend-clima.git
cd frontend-clima
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

> Obtén tu API key gratis en [openweathermap.org](https://openweathermap.org/api). Las keys nuevas pueden tardar ~2 horas en activarse.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)en tu navegador.

---
