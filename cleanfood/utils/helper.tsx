export const getrandomcolor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let j = 0; j < 6; j++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color
}

export const getAvatar = (data) => {
  if (data && !_.isNull(data) && !_.isEmpty(data)) {
    return data
  } else {
    return 'images/default-avatar.jpg'
  }
}

export const renderStatusTracking = (content: string) => {
  let contentConvert;
  switch (content) {
    case 'wait_confirmed':
      contentConvert = '#Chờ xác nhận';
      break;
    case 'pending':
      contentConvert = '#Chờ nhận hàng';
      break;
    case 'reject':
      contentConvert = '#Đã hủy';
      break;
    case 'deliveried':
      contentConvert = '#Đã giao';
      break;
  }
  return contentConvert
}