export const RGBToHex = (r: number, g: number, b: number) => {
  const convertedR =
    r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16)
  const convertedG =
    g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16)
  const convertedB =
    b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16)

  return '#' + convertedR + convertedG + convertedB
}
