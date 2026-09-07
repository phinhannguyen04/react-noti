console.log("MODE:", import.meta.env.MODE);
console.log("API URL:", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
    throw new Error("VITE_API_URL is not configured")
}

export async function apiRequest(path, options={}) {
    const resp = await fetch(
        `${API_URL}${path}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        },
    )

    if (!resp.ok) {
        let message = `HTTP ${response.status}`
        try {
            const body = await resp.json()
            message = body.message ?? body.error ?? message
        } catch {

        } throw new Error(message)
    }

    if (resp.status === 204) {
        return null
    }

    return resp.json()
}