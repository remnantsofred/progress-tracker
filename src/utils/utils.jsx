export const getUnixStringFromDatetimeLocalForm = (date) => {
  return new Date(date).getTime();
}

export const getDateTimeLocalFromUnix = (date) => {
  // desired format: '2024-05-17T15:00'
  let formatted;
  let dateObj = new Date(date);
  let yyyy = dateObj.getFullYear();
  let mm = dateObj.getMonth() + 1;
  let dd = dateObj.getDate();
  let hh = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  formatted = yyyy + '-' + ('0' + mm).slice(-2) + '-' + ('0' + dd).slice(-2) + 'T' + ('0' + hh).slice(-2) + ':' + ('0' + minutes).slice(-2);
  return formatted;
}