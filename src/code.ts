figma.showUI(__html__, { height: 472, width: 1026 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-tokens') {
    const semanticColorData = generateSemanticColor(
      msg.state.prefix,
      msg.state.hasPrimitive,
      msg.state.classifyByKeys,
      colorGroupList
    );
    const primitiveColorData = generatePrimitiveColor(
      msg.state.prefix,
      msg.state.hasPrimitive
    );
    figma.ui.postMessage({ semanticColorData, primitiveColorData });
  }
};

// TODO: これ以降をモジュールに切り出す
type ColorMap = {
  [key: string]: string;
};

type StyleMap = {
  [key: string]: ColorMap;
};

const colorGroupList = [
  { name: 'accent', style: 'accentColor' },
  { name: 'bg', style: 'backgroundColor' },
  { name: 'border', style: 'borderColor' },
  { name: 'shadow', style: 'boxShadowColor' },
  { name: 'caret', style: 'caretColor' },
  { name: 'divide', style: 'divideColor' },
  { name: 'outline', style: 'outlineColor' },
  { name: 'placeholder', style: 'placeholderColor' },
  { name: 'ring', style: 'ringColor' },
  { name: 'ring-offset', style: 'ringOffsetColor' },
  { name: 'text', style: 'textColor' },
  { name: 'decoration', style: 'textDecorationColor' },
];

const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

const normalizeColor = (r: number, g: number, b: number): string => {
  const normalization = (c: number): string => {
    return Math.round(c * 255).toString();
  };
  return `${normalization(r)} ${normalization(g)} ${normalization(b)}`;
};

const generateSemanticColor = (
  prefix: string,
  hasPrimitive: boolean,
  classifyByKeys: boolean,
  colorGroupList: Array<{ name: string; style: string }>
): string => {
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
            if (description && hasPrimitive) {
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

  const jsonSemanticColorData = JSON.stringify(
    styleMapToColorMap(
      styleMap,
      prefix,
      hasPrimitive,
      classifyByKeys,
      colorGroupList
    ),
    null,
    2
  );
  const formatSemanticColorData = jsonSemanticColorData
    .trim()
    .slice(1, -1)
    .replace(/^\s{2}/gm, '')
    .replace(/^\s+/, '');

  return formatSemanticColorData;
};

const styleMapToColorMap = (
  styleMap: StyleMap,
  prefix: string,
  hasPrimitive: boolean,
  classifyByKeys: boolean,
  colorGroupList: Array<{ name: string; style: string }>
) => {
  const colorTypes = colorGroupList.map((group) => group.style);
  const colorMaps: { [key: string]: ColorMap } = {
    colors: {},
  };
  colorTypes.forEach((colorType) => (colorMaps[colorType] = {}));

  if (hasPrimitive) delete styleMap[prefix];
  const lestObject = Object.assign({}, styleMap);
  if (classifyByKeys) {
    colorGroupList.forEach(({ name, style }) => {
      if (Object.keys(styleMap).includes(name)) {
        Object.assign(colorMaps[style], styleMap[name]);
        delete lestObject[name];
      }
    });
    Object.assign(colorMaps['colors'], lestObject);
  } else {
    Object.assign(colorMaps['colors'], styleMap);
  }

  return Object.fromEntries(
    Object.entries(colorMaps).filter(([_, value]) => Object.keys(value).length)
  );
};

const generatePrimitiveColor = (
  prefix: string,
  hasPrimitive: boolean
): string => {
  if (!hasPrimitive) return '';

  const paintStyles = figma.getLocalPaintStyles();
  const filteredStyles = paintStyles.filter((style) =>
    style.name.startsWith(`${prefix}/`)
  );
  const convertedStyles = filteredStyles.map((style) => {
    const paint = style.paints[0];
    if (!paint || paint.type !== 'SOLID') return '';
    const { r, g, b } = paint.color;
    return `--${style.name.replace(/\//g, '-')}: ${normalizeColor(r, g, b)}`;
  });
  const rootStyles = convertedStyles
    .filter((style) => style !== '')
    .join(';\n    ');

  return `@layer base {
  :root {
    ${rootStyles};
  }
}`;
};

const generateTextStyle = (): string => {
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
