import { Calendar, Label, ListBox, Select, Avatar, Description, Chip, Modal, Button } from "@heroui/react";
import { useState } from "react";

const weekOptions = [
    {id: "1", name: "1 week"}
];

const slots = [
    {slotNo: "1", date: "9/4/2026", timeRange: "9am - 10am", status: "Done", security: "Đỗ Thanh Nhàn", email: "thanhnhan-do@vn.apachefootwear.com", department: "Security"},
    {slotNo: "2", date: "9/3/2026", timeRange: "13pm - 14pm", status: "RESCHEDULED", security: "Đỗ Thanh Nhàn", email: "thanhnhan-do@vn.apachefootwear.com", department: "Security"},
    {slotNo: "3", date: "9/4/2026", timeRange: "8am - 9am", status: "OVERDUE", security: "Đỗ Thanh Nhàn", email: "thanhnhan-do@vn.apachefootwear.com", department: "Security"},
]


export default function App() {
    
    const [weeks, setWeeks] = useState(1)
    
    const fallback = (value) => {
        return value.split(" ")[0]
    }
    
    const randomGradient = () => {
        const hue1 = Math.floor(Math.random() * 360);
        const hue2 = (hue1 + 40 + Math.floor(Math.random() * 80)) % 360;
        return `linear-gradient(135deg, hsl(${hue1} 75% 55%), hsl(${hue2} 75% 55%))`;
    }
    
    const [variant] = useState("transparent")
    const [gradient] = useState(() => randomGradient());
    // const [dateTime, setDateTime] = useState(new Date())

    return(
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-end justify-between gap-5 p-4">
                <div className="w-40">
                    <Select 
                        value={String(weeks)}
                        onChange={(value) => value && setWeeks(Number(value))}
                    >
                        <Label>Visible week</Label>
                        
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        
                        <Select.Popover>
                            <ListBox>
                                {weekOptions.map(option => (
                                    <ListBox.Item key={option.id} id={option.id} textValue={option.name}>
                                        {option.name}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                
                <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
                

            </div>

            <Calendar aria-label="Week" visibleDuration={{weeks}}>
                <Calendar.Header>
                    <Calendar.Heading className="py-1"/>
                    <Calendar.NavButton slot="previous"/>
                    <Calendar.NavButton slot="next" />
                </Calendar.Header>
                <Calendar.Grid>
                    <Calendar.GridHeader>
                        {day => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>{date => <Calendar.Cell date={date} />}</Calendar.GridBody>
                </Calendar.Grid>
            </Calendar>

            <ListBox className="w-80">
                {
                    slots.map(slot => (
                        <ListBox.Item
                            className="rounded-lg data-[focused=true]:bg-accent/10 data-[selected=true]:bg-accent/5"
                            id={slot.slotNo}
                            key={slot.slotNo}
                            textValue={slot.security}
                        >
                        <Avatar size="md">
                            <Avatar.Fallback className="border-none text-white" style={{ background: gradient }}>{fallback(slot.timeRange)}</Avatar.Fallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col">
                            <div className="flex items-center gap-2">
                                <Label>{slot.security}</Label>
                                <Chip size="md" variant="soft" color="accent">{slot.department}</Chip>
                            </div>
                            <Description>{slot.email}</Description>
                        </div>
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                ))
            }
            </ListBox>


            <Modal>
                <Modal.Backdrop variant={variant}>
                    <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                        <Modal.Icon className="bg-default text-foreground">
                            item
                        </Modal.Icon>
                        <Modal.Heading>
                            Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                        <p>
                            This modal uses the <code>{variant}</code> backdrop variant. Compare the
                            different visual effects: opaque provides full opacity, blur adds a backdrop
                            filter, and transparent removes the background.
                        </p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button className="w-full" slot="close">
                            Continue
                        </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    )
}