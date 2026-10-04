const TIMEZONE = "Europe/London";
/** Opens at noon; closes at 2:00 am (next calendar day). */
const OPEN_MINUTES = 12 * 60;
const CLOSE_MINUTES = 2 * 60;

function getLondonMinutes(now: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function isLoungeOpenNow(now = new Date()): boolean {
  const minutes = getLondonMinutes(now);
  return minutes >= OPEN_MINUTES || minutes < CLOSE_MINUTES;
}

export type OpenStatus = {
  isOpen: boolean;
  label: string;
};

export function getLoungeOpenStatus(now = new Date()): OpenStatus {
  const isOpen = isLoungeOpenNow(now);
  if (isOpen) {
    return {
      isOpen: true,
      label: "Open now",
    };
  }

  return {
    isOpen: false,
    label: "Closed now",
  };
}
