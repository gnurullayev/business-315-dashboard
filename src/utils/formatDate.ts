import dayjs, { Dayjs } from "dayjs";

export function formatDate(
  date: string | Date | null | undefined,
  fromFormat: string,
  toFormat?: string
): string | Dayjs {
  if (!date) return "";
  if (dayjs(date).isValid()) {
    if (!toFormat) return dayjs(date);

    return dayjs(date).format(toFormat);
  }

  const parsed = dayjs(date as string, fromFormat, true);
  if (parsed.isValid()) {
    return parsed.format(toFormat);
  }

  return "";
}
