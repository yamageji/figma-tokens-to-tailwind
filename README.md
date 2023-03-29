# Tokens to Tailwind CSS　(Figma plugins)

This plugin generates utility classes for Tailwind CSS from design tokens set in the local style of Figma.

*Currently only colour styles are supported.

## Instructions
1. Create a local styles.
2. Run this plugin.
3. Select some options and press generate button.
4. Copy and paste the generated code into the Tailwind CSS configuration file.

## Options
### Primitive colours
Generates the primitive styles referenced by the semantic style as CSS variables.

read more:
https://tailwindcss.com/docs/customizing-colors#using-css-variables

### Classify by keys
If this option is checked and the style name matches a specific value, the style is classified under the corresponding 'key'. The correspondence between style names and keys is as follows.

| style name | keys |
|--------|-------|
| accent/* | accentColor |
| bg/* | backgroundColor |
| border/* | borderColor |
| shadow/* | boxShadowColor |
| caret/* | caretColor |
| divide/* | divideColor |
| outline/* | outlineColor |
| placeholder/* | placeholderColor |
| ring/* | ringColor |
| ring-offset/* | ringOffsetColor |
| text/* | textColor |
| decoration/* | textDecorationColor |

read more:
https://tailwindcss.com/docs/theme#configuration-reference