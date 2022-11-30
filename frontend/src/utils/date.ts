export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB');
};

export const formatHour = (date: Date) => {
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return hours + ':' + minutes;
};
