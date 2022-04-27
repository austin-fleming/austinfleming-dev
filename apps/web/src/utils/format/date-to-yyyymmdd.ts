export const dateToYYYYMMDD = (date: Date): string => date.toISOString().split('T')[0];
