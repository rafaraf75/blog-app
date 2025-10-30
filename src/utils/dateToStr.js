// Z Date -> "MM/DD/YYYY"
const pad = n => (n < 10 ? `0${n}` : `${n}`);

const dateToStr = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

export default dateToStr;