const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };

  const hex = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return hex;
};

figma.showUI(__html__, { height: 332, width: 664 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-tokens') {
    const paintStyles = figma.getLocalPaintStyles();
    const generateStyleData = (): string =>
      paintStyles
        .map((val) => {
          if ('color' in val.paints[0]) {
            return `${val.name}: ${rgbToHex(
              val.paints[0].color.r,
              val.paints[0].color.g,
              val.paints[0].color.b
            )}`;
          }
        })
        .join(', ');

    const printStyleData = generateStyleData();

    const textStyles = figma.getLocalTextStyles();
    const textStyleData = textStyles.map((val) => {
      return {
        name: val.name,
        size: val.fontSize,
        family: val.fontName.family,
        waight: val.fontName.style,
        letterSpacing: val.letterSpacing,
        lineHeight: val.lineHeight,
      };
    });

    figma.ui.postMessage({ printStyleData, textStyleData });
  }
};
