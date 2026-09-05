import { ListBox } from "@heroui/react";
import SlotItem from "./slot-item";

export default function SlotList({
    slots,
    gradient,
    onSelectSlot,
}) {
    const handleAction = (key) => {
        const selected = slots.find(
        (slot) => String(slot.slotNo) === String(key)
        );

        if (selected) {
        onSelectSlot(selected);
        }
    };

    return (
        <ListBox
        className="w-80"
        onAction={handleAction}
        >
        {slots.map((slot) => (
            <SlotItem
            key={slot.slotNo}
            slot={slot}
            gradient={gradient}
            />
        ))}
        </ListBox>
    );
}