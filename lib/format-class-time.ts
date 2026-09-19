export default function formatClassTime(value: number) {
  const hour = Math.floor(value);
  const minute = value % 1 === 0.5 ? '30' : '00';
  return `${String(hour).padStart(2, '0')}:${minute}`;
}
