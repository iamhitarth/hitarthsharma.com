export const getURLFormattedTag = tag =>
  tag.indexOf(' ') > -1 ? tag.split(' ').join('-') : tag
