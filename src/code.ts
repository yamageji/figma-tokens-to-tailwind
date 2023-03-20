// import { RGBToHex } from './lib/RgbToHex'

const RGBToHex = (r: number, g: number, b: number) => {
  const convertedR =
    r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16)
  const convertedG =
    g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16)
  const convertedB =
    b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16)

  return '#' + convertedR + convertedG + convertedB
}

figma.showUI(__html__)

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-tokens') {
    const paintStyles = figma.getLocalPaintStyles()
    const generateStyleData = () => {
      let result = ''
      for (const val of paintStyles) {
        if ('color' in val.paints[0]) {
          result += `, ${val.name}: ${RGBToHex(
            val.paints[0].color.r,
            val.paints[0].color.g,
            val.paints[0].color.b
          )}`
        }
      }
      return result
    }
    const printStyleData = generateStyleData()

    const textStyles = figma.getLocalTextStyles()
    const textStyleData = textStyles.map((val) => {
      return {
        name: val.name,
        size: val.fontSize,
        family: val.fontName.family,
        waight: val.fontName.style,
        letterSpacing: val.letterSpacing,
        lineHeight: val.lineHeight,
      }
    })

    figma.ui.postMessage({ printStyleData, textStyleData })
  }

  if (msg.type === 'cancel') {
    figma.closePlugin()
  }
}
