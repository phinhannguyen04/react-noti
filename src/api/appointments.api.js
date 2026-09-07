import { apiRequest } from "./http-client";

export function fetchAppointments(date) {
    const params = new URLSearchParams();

    if (date) {
        params.set("date", date);
    }

    const query = params.toString();

    return apiRequest(
        `/appointments${query ? `?${query}` : ""}`
    );
}

export function createAppointment(data) {
    return apiRequest("/appointments", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateAppointment(id, data) {
    return apiRequest(`/appointments/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export function deleteAppointment(id) {
    return apiRequest(`/appointments/${id}`, {
        method: "DELETE",
    });
}