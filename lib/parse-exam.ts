export default function parseExam(exam: string) {
  const match = exam.match(/(\d{4})\/(\d{2})\/(\d{2}).*?(\d{2}:\d{2})/);
  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    time: match[4],
  };
}
