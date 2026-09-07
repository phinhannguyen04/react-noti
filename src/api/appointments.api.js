import { apiRequest } from "./http-client";

export function fetchAppointments(date) {
    const param = new URLSearchParams()

    if (date) {
        param.set("date", date)
    }

    const query = param.toString()
    return apiRequest(`/appointments${query ? `?${query}` : ""}`)
}

export function createAppointment(data) {
    return apiRequest(
        "/appointments",
        {
            method: "POST",
            body: JSON.stringify(data),
        },
    )
}

export function updateAppointment(id, date) {
    return apiRequest(
        `/appointments/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(data),
        },
    )
}

export function deleteAppointment(id) {
    return apiRequest(
        `/appointments/${id}`,
        {
            method: "DELETE",
        },
    )
}