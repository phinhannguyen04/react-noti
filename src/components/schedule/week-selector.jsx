import { Label, ListBox, Select } from "@heroui/react";
import { weekOptions } from "../../data/schedule-data";

export default function WeekSelector({weeks, onWeeksChange}) {
    return (
        <div className="w-40">
            <Select
                value={String(weeks)}
                onChange={(value) => {
                    if (value) {
                        onWeeksChange(Number(value));
                    }
                }}
            >
                <Label>Visible week</Label>

                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                    <ListBox>
                        {weekOptions.map((option) => (
                            <ListBox.Item
                                key={option.id}
                                id={option.id}
                                textValue={option.name}
                            >
                                {option.name}

                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            ))}
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    )
}