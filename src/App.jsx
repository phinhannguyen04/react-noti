import { Button } from "@heroui/react";
import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date"

import WeekSelector from "./components/schedule/week-selector";
import ScheduleCalendar from "./components/schedule/schedule-calendar";
import SlotList from "./components/schedule/slot-list";
import SlotDetailModal from "./components/schedule/slot-detail-modal";

import { slots as initialSlots } from "./data/schedule-data";
import AppointmentFormModal from "./components/schedule/appointment-form-modal";

function randomGradient() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 =
        (hue1 + 40 + Math.floor(Math.random() * 80)) %
        360;

    return `linear-gradient(
        135deg,
        hsl(${hue1} 75% 55%),
        hsl(${hue2} 75% 55%)
    )`;
}

const getDateKey = (date) => {

    if (!date) return ""

    const month = String(date.month).padStart(2, "0")
    const day = String(date.day).padStart(2, "0")

    return `${date.year}-${month}-${day}`

}

const formatCalendarDate = date => {
    if (!date) {
        return
    }

    return `${date.month}/${date.day}/${date.year}`
}

export default function App() {
    const [weeks, setWeeks] = useState(1);
    const [variant] = useState("transparent");
    const [gradient] = useState(() => randomGradient());
    
    const [scheduleSlots, setScheduleSlots] = useState(initialSlots)
    const [selectedDate, setSelectedDate] = useState(() => today(getLocalTimeZone()))

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
    
    const selectedDateKey = getDateKey(selectedDate)
    const selectedDateLabel = formatCalendarDate(selectedDate)
    const filteredSlots = scheduleSlots.filter(slot => slot.date === selectedDateLabel)
    
    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
        setIsOpen(true);
    };

    const handleOpenAppointment = () => {
        if (!selectedDate) {
            return
        }

        setIsAppointmentOpen(true)
    }

    const handleCreateAppointment = (appointment) => {
        setScheduleSlots((currentSlots) => {
            const nextSlotNo = currentSlots.reduce(
                (max, slot) => Math.max(max, Number(slot.slotNo) || 0), 0
            ) + 1

            return [
                ...currentSlots,
                {
                    ...appointment,
                    slotNo: String(nextSlotNo),
                    dateKey: selectedDateKey,
                    date: selectedDateLabel,
                },
            ];
        })
        setIsAppointmentOpen(false)
    }

    
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-end justify-between gap-5 p-4">
                <WeekSelector
                    weeks={weeks}
                    onWeeksChange={setWeeks}
                />

                <Button
                    variant="secondary"
                    isDisabled={!selectedDate} 
                    onPress={() => {
                        // selectedSlot(slots[0])
                        // setIsOpen(prev => !prev)
                        handleOpenAppointment()
                    }}
                >
                    Add new
                </Button>
            </div>

            <ScheduleCalendar 
                weeks={weeks} 
                value={selectedDate}
                onChange={setSelectedDate}
            />

            <SlotList
                slots={filteredSlots}
                gradient={gradient}
                onSelectSlot={handleSelectSlot}

            />

            <AppointmentFormModal 
                isOpen={isAppointmentOpen}
                onOpenChange={setIsAppointmentOpen}
                selectedDate={selectedDateLabel}
                onSubmit={handleCreateAppointment}
            />

            <SlotDetailModal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                slot={selectedSlot}
                variant={variant}
            />
        </div>
    );
}