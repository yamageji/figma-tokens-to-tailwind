import { colorGroupList } from './lib/colorGroupList';
import { generatePrimitiveColor } from './lib/generatePrimitiveColor';
import { generateSemanticColor } from './lib/generateSemanticColor';
import { generateTextStyle } from './lib/generateTextStyle';

type Message = {
  type: 'generate-tokens';
  state: State;
};
type State = {
  prefix: string;
  hasPrimitive: boolean;
  classifyByKeys: boolean;
};

figma.showUI(__html__, { height: 472, width: 1026 });

figma.ui.onmessage = (msg: Message) => {
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
    const textData = generateTextStyle();
    figma.ui.postMessage({ semanticColorData, primitiveColorData, textData });
  }
};
