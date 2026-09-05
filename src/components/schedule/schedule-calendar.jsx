import { Calendar } from "@heroui/react";

export default function ScheduleCalendar({ weeks }) {
    return (
        <Calendar
            aria-label="Week"
            visibleDuration={{ weeks }}
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