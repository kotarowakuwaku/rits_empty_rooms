export const CAMPUS_MODE = {
  LeftName: "BKC",
  CenterName: "KIC",
  RightName: "OIC",
} as const;

export type CampusMode = (typeof CAMPUS_MODE)[keyof typeof CAMPUS_MODE];
