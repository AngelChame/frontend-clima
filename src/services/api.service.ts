
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public errors?: Record<string, string[]>
    ) {
        super(message);
        this.name = "ApiError";
    }
}

interface FetchOptions extends RequestInit {
    _retry?: boolean;
}


export const apiFetch = async <T = unknown>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> => {
    const { _retry: _r, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        ...(fetchOptions.headers as Record<string, string>),
    };

    if (!(fetchOptions.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`/api${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    if (res.ok) {
        const text = await res.text();
        return (text ? JSON.parse(text) : null) as T;
    }

    const body = await res
        .json()
        .catch(() => ({ message: "Error desconocido" }));

    throw new ApiError(res.status, body.message ?? "Error desconocido", body.errors);
};
