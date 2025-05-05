function parseDurationString(durationString: string) {
  const durationParts = durationString.split(' ');

  let days = 0;
  let timeString = durationString;

  if (durationParts.length === 2) {
    days = parseInt(durationParts[0]);
    timeString = durationParts[1];
  }

  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2]);

  return { days, hours, minutes, seconds };
}

export function prettyDuration(durationString: string) {
  const { days, hours, minutes, seconds } = parseDurationString(durationString);

  const dDisplay = days > 0 ? `${days} д ` : '';
  const hDisplay = hours > 0 ? `${hours} ч ` : '';
  const mDisplay = minutes > 0 ? `${minutes} мин ` : '';
  const sDisplay = seconds > 0 ? `${seconds} сек` : '';

  return `${dDisplay}${hDisplay}${mDisplay}${sDisplay}`.trim();
}
