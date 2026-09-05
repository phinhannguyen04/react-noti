import { Calendar } from "@heroui/react";

export default function ScheduleCalendar({
    weeks,
    value,
    onChange,
}) {
    return (
        <Calendar
            aria-label="Week"
            visibleDuration={{ weeks }}
            value={value}
            onChange={onChange}
        >
            <Calendar.Header>
                <Calendar.Heading className="py-1" />

                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
            </Calendar.Header>

            <Calendar.Grid>
                <Calendar.GridHeader>
                    {(day) => (
                        <Calendar.HeaderCell>
                            {day}
                        </Calendar.HeaderCell>
                    )}
                </Calendar.GridHeader>

                <Calendar.GridBody>
                    {(date) => (
                        <Calendar.Cell date={date} />
                    )}
                </Calendar.GridBody>
            </Calendar.Grid>
        </Calendar>
    );
}