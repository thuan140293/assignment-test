import { format, parseISO, isValid } from 'date-fns';

export function formatDate(input: Date | string, fmt: string): string {
  let dt: Date;
  if (input instanceof Date) {
    dt = input;
  } else {
    dt = parseISO(input);
    if (!isValid(dt)) {
      dt = new Date(input);
    }
  }

  if (!isValid(dt)) {
    console.warn(`formatDate: invalid date input "${input}"`);
    return '';
  }

  try {
    return format(dt, fmt);
  } catch (err) {
    console.error(`formatDate: lỗi format với fmt="${fmt}"`, err);
    return '';
  }
}
