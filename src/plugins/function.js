export function formatDate(value, details = false) {
  let date = new Date(value * 1000);
  let y = date.getFullYear().toString(),
    m = date.getMonth() + 1,
    d = date.getDate();
  let h, min;
  if (details) {
    h = date.getHours();
    min = date.getMinutes();
    if (h < 10) h = "0" + h;
    if (min < 10) min = "0" + min;
  }
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  let str = y + "-" + m + "-" + d + " ";
  return details ? str + h + ":" + min : str;
}

export function validate(...args) {
  for (let k of args) {
    if (k.length === 0) {
      return false;
    }
  }
  return true;
}
