export const TiME_DETAILS = {
one: 1,
two: 2,
three: 3,
four: 4,
five: 5,
six: 6,
} as const;

export type TimeDetails = (typeof TiME_DETAILS)[keyof typeof TiME_DETAILS];