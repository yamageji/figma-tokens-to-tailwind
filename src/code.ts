figma.showUI(__html__, { height: 600, width: 664 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-tokens') {
    const colorData = generateColorData();
    const textData = generateTextData();

    figma.ui.postMessage({ colorData, textData });
  }
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

const generateColorData = (): string => {
  const paintStyles = figma.getLocalPaintStyles();
  const styleMap = {};

  paintStyles.forEach((style) => {
    const paint = style.paints[0];
    if (paint.type === 'SOLID') {
      const styleNames = style.name.split('/');
      let currentStyle = styleMap;
      styleNames.forEach((name, index) => {
        if (!currentStyle[name]) {
          if (index === styleNames.length - 1) {
            currentStyle[name] = rgbToHex(
              paint.color.r,
              paint.color.g,
              paint.color.b
            );
          } else {
            currentStyle[name] = {};
          }
        }
        currentStyle = currentStyle[name];
      });
    }
  });

  return JSON.stringify(styleMap, null, 2);
};

const generateTextData = (): string => {
  const textStyles = figma.getLocalTextStyles();
  const textStyleData = textStyles.map((style) => {
    return {
      name: style.name,
      size: style.fontSize,
      family: style.fontName.family,
      waight: style.fontName.style,
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
    };
  });

  return textStyleData[0].name;
};
