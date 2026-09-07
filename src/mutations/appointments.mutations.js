import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from "../api/appointments.api";

import {
    appointmentKeys,
} from "../queries/appointments.queries";


export function useCreateAppointment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAppointment,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: appointmentKeys.all,
            });
        },
    });
}


export function useUpdateAppointment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            updateAppointment(id, data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: appointmentKeys.all,
            });
        },
    });
}


export function useDeleteAppointment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAppointment,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: appointmentKeys.all,
            });
        },
    });
}