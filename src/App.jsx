import { Button } from "@heroui/react";
import { useState } from "react";

import WeekSelector from "./components/schedule/week-selector";
import ScheduleCalendar from "./components/schedule/schedule-calendar";
import SlotList from "./components/schedule/slot-list";
import SlotDetailModal from "./components/schedule/slot-detail-modal";

import { slots } from "./data/schedule-data";

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

export default function App() {
    const [weeks, setWeeks] = useState(1);
    const [variant] = useState("transparent");
    const [gradient] = useState(() => randomGradient());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const variantLabel =
        variant.charAt(0).toUpperCase() +
        variant.slice(1);

    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
        setIsOpen(true);
    };

    return (
        <div className="flex flex-col items-center gap-6">
        <div className="flex items-end justify-between gap-5 p-4">
            <WeekSelector
                weeks={weeks}
                onWeeksChange={setWeeks}
            />

            <Button
                variant="secondary" 
                onPress={() => {
                    selectedSlot(slots[0])
                    setIsOpen(prev => !prev)
                }}
            >
                {variantLabel}
            </Button>
        </div>

        <ScheduleCalendar weeks={weeks} />

        <SlotList
            slots={slots}
            gradient={gradient}
            onSelectSlot={handleSelectSlot}
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