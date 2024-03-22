export const DAY_DETAILS = {
  mon: "mon",
  tue: "tue",
  wed: "wed",
  thu: "thu",
  fri: "fri",
} as const;

export type DayDetails = (typeof DAY_DETAILS)[keyof typeof DAY_DETAILS];
