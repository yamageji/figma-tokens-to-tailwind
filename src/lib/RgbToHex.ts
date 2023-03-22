export const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }

  const hex = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
  return hex
}
