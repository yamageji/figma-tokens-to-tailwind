import { rgbToHex } from './rgbToHex';

type ColorMap = {
  [key: string]: string;
};

type StyleMap = {
  [key: string]: ColorMap;
};

export const generateSemanticColor = (
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

export const styleMapToColorMap = (
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
