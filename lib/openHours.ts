// Horarios CLM French Tacos · Ciudad Real
// Lunes: cerrado
// Mar–Jue, Dom: 13:00–16:00 · 20:00–00:00
// Vie–Sáb:      13:00–16:00 · 20:00–01:00

// Day shifts (24h, end > 24 means next-day close)
type Shift = { start: number; end: number }; // minutes from midnight
const M = (h: number, m: number = 0) => h * 60 + m;

// JS getDay(): 0=Sun, 1=Mon, ... 6=Sat
const SHIFTS_BY_DAY: Record<number, Shift[]> = {
  1: [], // lunes
  2: [{ start: M(13), end: M(16) }, { start: M(20), end: M(24) }],
  3: [{ start: M(13), end: M(16) }, { start: M(20), end: M(24) }],
  4: [{ start: M(13), end: M(16) }, { start: M(20), end: M(24) }],
  5: [{ start: M(13), end: M(16) }, { start: M(20), end: M(25) }], // vie cierra 01h
  6: [{ start: M(13), end: M(16) }, { start: M(20), end: M(25) }], // sáb cierra 01h
  0: [{ start: M(13), end: M(16) }, { start: M(20), end: M(24) }],
};

export type OpenStatus =
  | { open: true; closesIn: number /* min */; closesAt: string /* HH:MM */ }
  | { open: false; opensIn: number /* min */; opensAt: string };

export function getStatus(date: Date = new Date()): OpenStatus {
  const dow = date.getDay();
  const minNow = date.getHours() * 60 + date.getMinutes();

  // Currently open?
  for (const shift of SHIFTS_BY_DAY[dow] ?? []) {
    if (minNow >= shift.start && minNow < shift.end) {
      return {
        open: true,
        closesIn: shift.end - minNow,
        closesAt: formatHM(shift.end),
      };
    }
  }
  // After-midnight roll: yesterday's late-night shift
  const yesterday = (dow + 6) % 7;
  for (const shift of SHIFTS_BY_DAY[yesterday] ?? []) {
    if (shift.end > 24 * 60) {
      const adjustedStart = shift.start - 24 * 60;
      const adjustedEnd = shift.end - 24 * 60;
      if (minNow >= adjustedStart && minNow < adjustedEnd) {
        return {
          open: true,
          closesIn: adjustedEnd - minNow,
          closesAt: formatHM(adjustedEnd + 24 * 60),
        };
      }
    }
  }

  // Closed — find next opening
  for (let dayOffset = 0; dayOffset < 8; dayOffset++) {
    const checkDay = (dow + dayOffset) % 7;
    const shifts = SHIFTS_BY_DAY[checkDay] ?? [];
    for (const shift of shifts) {
      const totalMinutesUntil = dayOffset * 24 * 60 + shift.start - minNow;
      if (totalMinutesUntil > 0) {
        return {
          open: false,
          opensIn: totalMinutesUntil,
          opensAt: formatHM(shift.start),
        };
      }
    }
  }
  return { open: false, opensIn: 0, opensAt: "13:00" };
}

function formatHM(totalMin: number): string {
  const m = totalMin % (24 * 60);
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h < 24) return m > 0 ? `${h}h ${m}min` : `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d ${h % 24}h`;
}
