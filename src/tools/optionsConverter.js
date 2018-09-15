const convertOption = option => {
  const [label, value] = option.split('|');
  return {
    value,
    label,
  };
};

export const convertOptions = text => {
  const options = text.split('\n').filter(option => option);
  return options.map(convertOption);
};
