import {
  Avatar,
  Chip,
  Description,
  Label,
  ListBox,
} from "@heroui/react";

export default function SlotItem({
  slot,
  gradient,
}) {
  return (
    <ListBox.Item
      id={slot.slotNo}
      textValue={slot.security}
      className="rounded-lg data-[focused=true]:bg-accent/10 data-[selected=true]:bg-accent/5"
    >
      <Avatar size="md">
        <Avatar.Fallback
          className="border-none text-white"
          style={{ background: gradient }}
        >
          {slot.timeRange.split(" ")[0]}
        </Avatar.Fallback>
      </Avatar>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2">
          <Label>{slot.security}</Label>

          <Chip
            size="md"
            variant="soft"
            color="accent"
          >
            {slot.department}
          </Chip>
        </div>

        <Description>
          {slot.email}
        </Description>
      </div>

      <ListBox.ItemIndicator />
    </ListBox.Item>
  );
}