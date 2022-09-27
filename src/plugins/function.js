export function formatDate(value, details = false) {
  let date = new Date(value * 1000);
  let y = date.getFullYear().toString(),
    m = date.getMonth() + 1,
    d = date.getDate();
  let h, min, sec;
  if (details) {
    h = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    if (h < 10) h = "0" + h;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
  }
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  let str = y + "-" + m + "-" + d + " ";
  return details ? str + h + ":" + min + ":" + sec : str;
}

export function validate(...args) {
  for (let k of args) {
    console.log(k)
    if (k.length === 0) {
      return false;
    }
  }
  return true;
}
