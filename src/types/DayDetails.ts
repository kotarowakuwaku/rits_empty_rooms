export const DAY_DETAILS = {
  mon: "月",
  tue: "火",
  wed: "水",
  thu: "木",
  fri: "金",
} as const;

export type DayDetails = (typeof DAY_DETAILS)[keyof typeof DAY_DETAILS];
