figma.showUI(__html__, { height: 768, width: 768 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-tokens') {
    const semanticColorData = generateSemanticColorData(msg.state.prefix);
    const primitiveColorData = generatePrimitiveColorData(msg.state.prefix);
    const textData = generateTextData();
    figma.ui.postMessage({ semanticColorData, primitiveColorData, textData });
  }
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

const standardiseColors = (r: number, g: number, b: number): string => {
  const standardization = (c: number): string => {
    return Math.round(c * 255).toString();
  };
  return `${standardization(r)} ${standardization(g)} ${standardization(b)}`;
};

const generateSemanticColorData = (prefix: string): string => {
  const paintStyles = figma.getLocalPaintStyles();

  const styleMap = {};
  paintStyles.forEach((style) => {
    const paint = style.paints[0];
    const description = style.description;

    if (paint.type === 'SOLID') {
      const styleNames = style.name.split('/');
      let currentStyle = styleMap;
      styleNames.forEach((name, index) => {
        if (!currentStyle[name]) {
          if (index === styleNames.length - 1) {
            if (description) {
              currentStyle[
                name
              ] = `rgb(var(--${prefix}-${description}) / <alpha-value>)`;
              return;
            }
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

const generatePrimitiveColorData = (prefix: string): string => {
  const paintStyles = figma.getLocalPaintStyles();
  const filterdStyle = paintStyles.filter(
    (style) => style.name.split('/')[0] === prefix
  );
  const convertedStyle = filterdStyle.map((style) => {
    const paint = style.paints[0];
    if (paint.type === 'SOLID') {
      return `--${style.name.replace(/\//g, '-')}: ${standardiseColors(
        paint.color.r,
        paint.color.g,
        paint.color.b
      )}`;
    }
  });
  return `@layer base {\n  :root {\n    ${convertedStyle.join(
    ';\n    '
  )};\n  }\n}`;
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
