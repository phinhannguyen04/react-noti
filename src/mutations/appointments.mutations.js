import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentKeys } from "../queries/appointments.queries";
import { createAppointment, deleteAppointment, updateAppointment } from "../api/appointments.api";

export function useCreateAppointment() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: createAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: appointmentKeys.all,
            })
        },
    })
}

export function useUpdateAppointment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, data}) => updateAppointment(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: appointmentKeys.all
            })
        }
    })
}

export function useDeleteAppointment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: appointmentKeys.all
            })
        }
    })
}