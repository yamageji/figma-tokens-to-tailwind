figma.showUI(__html__)

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-tokens') {
    const style = figma.getLocalPaintStyles()
    const result = style.map((val) => val.name)

    // カラートークンをログに出力する
    console.log(result)
  }

  if (msg.type === 'cancel') {
    figma.closePlugin()
  }
}
