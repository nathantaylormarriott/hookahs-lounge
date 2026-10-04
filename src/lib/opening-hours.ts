const TIMEZONE = "Europe/London";
/** Every day opens at noon. Sunday–Thursday close at 2:00 am; Friday and Saturday close at 3:00 am. */
const OPEN_MINUTES = 12 * 60;
const WEEKDAY_CLOSE_MINUTES = 2 * 60;
const WEEKEND_CLOSE_MINUTES = 3 * 60;

type LondonClock = {
  weekday: string;
  minutes: number;
};

function getLondonClock(now: Date): LondonClock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { weekday, minutes: hour * 60 + minute };
}

export function isLoungeOpenNow(now = new Date()): boolean {
  const { weekday, minutes } = getLondonClock(now);
  if (minutes >= OPEN_MINUTES) return true;
  if (minutes < WEEKDAY_CLOSE_MINUTES) return true;
  const lateClose = weekday === "Saturday" || weekday === "Sunday";
  return lateClose && minutes < WEEKEND_CLOSE_MINUTES;
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
