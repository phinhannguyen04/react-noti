const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("VITE_API_URL is not configured");
}

export async function apiRequest(path, options = {}) {
    const response = await fetch(
        `${API_URL}${path}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        },
    );

    if (!response.ok) {
        let message = `HTTP ${response.status}`;

        try {
            const body = await response.json();

            message =
                body.message ??
                body.error ??
                message;
        } catch {
            message = `HTTP ${response.status}`;
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}