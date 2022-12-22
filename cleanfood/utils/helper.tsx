export const getrandomcolor = () =>  {
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