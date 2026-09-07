export function appointmentToSlot(
  appointment,
) {
  return {
    id:
      appointment.id,

    slotNo:
      appointment.id,

    dateKey:
      appointment.date,

    date:
      formatDate(
        appointment.date,
      ),

    timeRange:
      formatTimeRange(
        appointment.startTime,
        appointment.endTime,
      ),

    status:
      appointment.status,

    security:
      appointment.assignee ??
      appointment.title,

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

  if (!endTime) {
    return startTime;
  }

  return `${startTime} - ${endTime}`;
}