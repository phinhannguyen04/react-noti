export function appointmentToSlot(appointment) {
    return {
        id: appointment.id,

        slotNo: appointment.id,

        dateKey: appointment.date,

        date: formatDate(
            appointment.date,
        ),

        startTime:
            appointment.startTime ?? "",

        endTime:
            appointment.endTime ?? "",

        timeRange:
            formatTimeRange(
                appointment.startTime,
                appointment.endTime,
            ),

        status:
            appointment.status ?? "",

        security:
            appointment.assignee ??
            appointment.title ??
            "",

        email:
            appointment.description ??
            "",

        department:
            appointment.location ??
            "",
    };
}


function formatDate(date) {
    if (!date) {
        return "";
    }

    const [
        year,
        month,
        day,
    ] = date.split("-");

    return `${Number(month)}/${Number(day)}/${year}`;
}


function formatTimeRange(
    startTime,
    endTime,
) {
    if (!startTime) {
        return "";
    }

    const formattedStart =
        normalizeTime(startTime);

    if (!endTime) {
        return formattedStart;
    }

    const formattedEnd =
        normalizeTime(endTime);

    return `${formattedStart} - ${formattedEnd}`;
}


function normalizeTime(time) {
    if (!time) {
        return "";
    }
    return time.slice(0, 5);
}