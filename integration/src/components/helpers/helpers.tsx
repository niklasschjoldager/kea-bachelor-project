export function addLeadingZero(value: number | string) {
  const formattedValue = typeof value === "number" ? value : parseInt(value);

  if (formattedValue < 10) {
    return ("0" + value).slice(-2).toString();
  }
  return value.toString();
}

export function convertToDate(datetime: string) {
  const date = datetime.split('T')[0]
  const year = date.split('-')[0]
  const month = date.split('-')[1]
  const day = date.split('-')[2]

  return `${day}/${month}/${year}`
}

export function convertToTime(datetime: string) {
  const date = datetime.split('T')[1]
  const hour = date.split(':')[0]
  const minuttes = date.split(':')[1]

  return `${hour}:${minuttes}`
}
