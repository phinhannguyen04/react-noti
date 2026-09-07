import { useQuery } from "@tanstack/react-query";
import { fetchAppointments } from "../api/appointments.api";

export const appointmentKeys = {
    app: ["appointments"],
    byDate: (date) => [
        "appointments",
        "date",
        date
    ],
}

export function useAppointments(date) {
    return useQuery({
        queryKey: appointmentKeys.byDate(date),
        queryFn: () => fetchAppointments(date),
        enabled: Boolean(date)
    })
}