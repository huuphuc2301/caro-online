export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB');
};

export const formatHour = (date: Date) => {
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return hours + ':' + minutes;
};

export const Dayof = (day: number) => {
  switch (day) {
    case 0:
      return 'Chủ nhật';
      break;
    case 1:
      return 'Thứ hai';
      break;
    case 2:
      return 'Thứ ba';
      break;
    case 3:
      return 'Thứ tư';
      break;
    case 4:
      return 'Thứ năm';
      break;
    case 5:
      return 'Thứ sáu';
      break;
    case 6:
      return 'Thứ bảy';
  }
};

export const formatDay = (date: Date) => {
  return Dayof(date.getDay());
};
