export const formatStrToNum = (str: string) => {
  const match = str.match(/(\d+)(cm|kg)/);
  return match ? { value: parseInt(match[1]), unit: match[2] } : null;
};
