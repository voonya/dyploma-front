export const toTitleCase = (text) => {
  return text.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
};

export const renderIsPropaganda = (active) => {
  return toTitleCase(`${active}`);
};
