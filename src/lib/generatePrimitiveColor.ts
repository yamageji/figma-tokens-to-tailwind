import { normalizeColor } from './normalizeColor';

export const generatePrimitiveColor = (
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
