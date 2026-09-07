import {
    Button,
    Spinner,
} from "@heroui/react";

import { useState } from "react";

import {
    today,
    getLocalTimeZone,
} from "@internationalized/date";

import WeekSelector from "./components/schedule/week-selector";
import ScheduleCalendar from "./components/schedule/schedule-calendar";
import SlotList from "./components/schedule/slot-list";
import SlotDetailModal from "./components/schedule/slot-detail-modal";
import AppointmentFormModal from "./components/schedule/appointment-form-modal";

import {
    useAppointments,
} from "./queries/appointments.queries";

import {
    useCreateAppointment,
    useUpdateAppointment,
    useDeleteAppointment,
} from "./mutations/appointments.mutations";

import {
    appointmentToSlot,
} from "./api/appointment.mapper";


function randomGradient() {
    const hue1 =
        Math.floor(
            Math.random() * 360,
        );

    const hue2 =
        (
            hue1 +
            40 +
            Math.floor(
                Math.random() * 80,
            )
        ) % 360;

    return `linear-gradient(
        135deg,
        hsl(${hue1} 75% 55%),
        hsl(${hue2} 75% 55%)
    )`;
}


const getDateKey = (date) => {
    if (!date) {
        return "";
    }

    const month =
        String(date.month)
            .padStart(2, "0");

    const day =
        String(date.day)
            .padStart(2, "0");

    return `${date.year}-${month}-${day}`;
};


const formatCalendarDate = (date) => {
    if (!date) {
        return "";
    }

    return `${date.month}/${date.day}/${date.year}`;
};


export default function App() {
    const [
        weeks,
        setWeeks,
    ] = useState(1);

    const [variant] =
        useState("transparent");

    const [gradient] =
        useState(
            () => randomGradient(),
        );

    const [
        selectedDate,
        setSelectedDate,
    ] = useState(() =>
        today(getLocalTimeZone()),
    );

    const [
        selectedSlotId,
        setSelectedSlotId,
    ] = useState(null);

    const [
        isOpen,
        setIsOpen,
    ] = useState(false);

    const [
        isAppointmentOpen,
        setIsAppointmentOpen,
    ] = useState(false);


    const selectedDateLabel =
        formatCalendarDate(
            selectedDate,
        );

    const selectedDateKey =
        getDateKey(
            selectedDate,
        );


    const {
        data: appointments = [],
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useAppointments(
        selectedDateKey,
    );


    const createAppointment =
        useCreateAppointment();

    const updateAppointment =
        useUpdateAppointment();

    const deleteAppointment =
        useDeleteAppointment();


    const slots =
        appointments.map(
            appointmentToSlot,
        );


    const selectedSlot =
        slots.find(
            (slot) =>
                slot.id ===
                selectedSlotId,
        ) ?? null;


    const handleSelectSlot = (
        slot,
    ) => {
        setSelectedSlotId(
            slot.id,
        );

        setIsOpen(true);
    };


    const handleOpenAppointment =
        () => {
            if (!selectedDate) {
                return;
            }

            setIsAppointmentOpen(
                true,
            );
        };


    const handleCreateAppointment = async (appointment) => {
        await createAppointment.mutateAsync({
            title: appointment.security,
            date: selectedDateKey,
            startTime: appointment.startTime,
            endTime: appointment.endTime || null,
            assignee: appointment.security,
            location: appointment.department,
            description: appointment.email,
            status: appointment.status,
        });
    };


    const handleUpdateAppointment = async (id, appointment) => {
        await updateAppointment.mutateAsync({
            id,

            data: {
                title: appointment.security,
                startTime: appointment.startTime,
                endTime: appointment.endTime || null,
                assignee: appointment.security,
                location: appointment.department,
                description: appointment.email,
                status: appointment.status,
            },
        });
    };


    const handleDeleteAppointment = async (id) => {
        await deleteAppointment.mutateAsync(id);

        setSelectedSlotId(null);
        setIsOpen(false);
    };


    return (
        <div className="flex flex-col items-center gap-6">

            <div className="flex items-end justify-between gap-5 p-4">

                <WeekSelector
                    weeks={weeks}
                    onWeeksChange={
                        setWeeks
                    }
                />

                <Button
                    variant="secondary"
                    isDisabled={
                        !selectedDate
                    }
                    onPress={
                        handleOpenAppointment
                    }
                >
                    Add new
                </Button>

            </div>


            <ScheduleCalendar
                weeks={weeks}
                value={selectedDate}
                onChange={
                    setSelectedDate
                }
            />


            {isLoading && (
                <div className="flex items-center gap-2">

                    <Spinner
                        size="sm"
                    />

                    <span className="text-sm text-default-500">
                        Loading appointments...
                    </span>

                </div>
            )}


            {isFetching &&
                !isLoading && (
                    <span className="text-xs text-default-400">
                        Refreshing...
                    </span>
                )}


            {isError && (
                <div className="flex flex-col items-center gap-3">

                    <p className="text-sm text-danger">
                        {error?.message ??
                            "Failed to load appointments"}
                    </p>

                    <Button
                        size="sm"
                        variant="flat"
                        onPress={() =>
                            refetch()
                        }
                    >
                        Retry
                    </Button>

                </div>
            )}


            {!isLoading &&
                !isError &&
                slots.length ===
                    0 && (
                    <div className="py-8 text-center">

                        <p className="text-default-500">
                            No appointments for this date.
                        </p>

                    </div>
                )}


            {!isLoading &&
                !isError &&
                slots.length >
                    0 && (
                    <SlotList
                        slots={
                            slots
                        }
                        gradient={
                            gradient
                        }
                        onSelectSlot={
                            handleSelectSlot
                        }
                    />
                )}


            <AppointmentFormModal
                isOpen={
                    isAppointmentOpen
                }

                onOpenChange={
                    setIsAppointmentOpen
                }

                selectedDate={
                    selectedDateLabel
                }

                onSubmit={
                    handleCreateAppointment
                }

                isSubmitting={
                    createAppointment.isPending
                }
            />


            <SlotDetailModal
                isOpen={
                    isOpen
                }

                onOpenChange={
                    setIsOpen
                }

                slot={
                    selectedSlot
                }

                variant={
                    variant
                }

                onUpdate={
                    handleUpdateAppointment
                }

                onDelete={
                    handleDeleteAppointment
                }

                isUpdating={
                    updateAppointment.isPending
                }

                isDeleting={
                    deleteAppointment.isPending
                }
            />

        </div>
    );
}