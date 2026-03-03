function normalizeDate(date) {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function isSameDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export function formatDate(date) {
  const normalizedDate = normalizeDate(date);

  if (!normalizedDate) {
    return "";
  }

  return normalizedDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(date) {
  const normalizedDate = normalizeDate(date);

  if (!normalizedDate) {
    return "";
  }

  return normalizedDate.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getRelativeTime(date) {
  const normalizedDate = normalizeDate(date);

  if (!normalizedDate) {
    return "";
  }

  const now = new Date();
  const diffInSeconds = Math.round((normalizedDate.getTime() - now.getTime()) / 1000);
  const formatter = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

  const ranges = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ];

  for (const range of ranges) {
    if (Math.abs(diffInSeconds) >= range.seconds) {
      return formatter.format(
        Math.round(diffInSeconds / range.seconds),
        range.unit
      );
    }
  }

  return formatter.format(diffInSeconds, "second");
}

export function isOverdue(dueDate, completed) {
  const normalizedDate = normalizeDate(dueDate);

  if (!normalizedDate || completed) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return normalizedDate < today;
}

export function getDueDateLabel(dueDate) {
  const normalizedDate = normalizeDate(dueDate);

  if (!normalizedDate) {
    return null;
  }

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (isSameDay(normalizedDate, today)) {
    return "Hoy";
  }

  if (isSameDay(normalizedDate, tomorrow)) {
    return "Manana";
  }

  if (isOverdue(normalizedDate, false)) {
    return "Vencida";
  }

  return formatDate(normalizedDate);
}

export function toInputDate(date) {
  const normalizedDate = normalizeDate(date);

  if (!normalizedDate) {
    return "";
  }

  const year = normalizedDate.getFullYear();
  const month = String(normalizedDate.getMonth() + 1).padStart(2, "0");
  const day = String(normalizedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
