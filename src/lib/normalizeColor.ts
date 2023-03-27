export const normalizeColor = (r: number, g: number, b: number): string => {
  const normalization = (c: number): string => {
    return Math.round(c * 255).toString();
  };
  return `${normalization(r)} ${normalization(g)} ${normalization(b)}`;
};
