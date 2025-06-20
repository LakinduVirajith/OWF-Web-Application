export const extractParagraphs = (data) => {
  const paragraphs = {};
  Object.keys(data).forEach((key) => {
    if (/^Para_\d+$/.test(key)) {
      const paraIndex = key.split('_')[1];
      paragraphs[`paragraph${paraIndex}`] = data[key];
    }
  });
  return paragraphs;
};
