<script lang="ts">
  import { onMount } from 'svelte';
  import Button from './Button.svelte';
  import CodeArea from './CodeArea.svelte';
  import CheckBoxItem from './CheckBoxItem.svelte';
  import TextInputItem from './TextInputItem.svelte';
  import IconArrowPath from './icons/IconArrowPath.svelte';

  type colorData = {
    data: string;
    isCopied: boolean;
  };

  let primitiveColor: colorData = {
    data: '',
    isCopied: false,
  };
  let semanticColor: colorData = {
    data: '',
    isCopied: false,
  };
  let textData: string;

  let prefix = '';
  let hasPrimitive = false;
  let classifyByKeys = false;

  const generateTokens = () => {
    primitiveColor.isCopied = false;
    semanticColor.isCopied = false;

    parent.postMessage(
      {
        pluginMessage: {
          type: 'generate-tokens',
          state: { prefix, hasPrimitive, classifyByKeys },
        },
      },
      '*'
    );
  };

  const copyText = (event) => {
    let textArea = document.createElement('textarea');
    textArea.value =
      event.target.id === 'semantic' ? semanticColor.data : primitiveColor.data;

    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();
    document.execCommand('copy');

    if (event.target.id === 'semantic' && semanticColor.isCopied === false) {
      semanticColor.isCopied = true;
      setTimeout(() => {
        semanticColor.isCopied = false;
      }, 2000);
    } else if (
      event.target.id === 'primitive' &&
      primitiveColor.isCopied === false
    ) {
      primitiveColor.isCopied = true;
      setTimeout(() => {
        primitiveColor.isCopied = false;
      }, 2000);
    }
  };

  onmessage = (event) => {
    semanticColor.data = event.data.pluginMessage.semanticColorData;
    primitiveColor.data = event.data.pluginMessage.primitiveColorData;
    textData = event.data.pluginMessage.textData;
  };

  onMount(() => generateTokens());
</script>

<div class="m-4 flex gap-8">
  <div class="w-[200px] flex-shrink-0">
    <h2 class="text-lg font-bold">Settings</h2>
    <div class="mt-2 flex flex-col gap-1">
      <CheckBoxItem bind:checked={hasPrimitive}>Primitive styles</CheckBoxItem>
      <TextInputItem bind:value={prefix}>prefix:</TextInputItem>
      <CheckBoxItem bind:checked={classifyByKeys}>Classify by keys</CheckBoxItem
      >
    </div>
    <Button on:click={generateTokens} class="mt-8">
      generate
      <IconArrowPath />
    </Button>
  </div>

  <div class="flex flex-grow gap-6">
    <CodeArea
      colorData={semanticColor.data}
      isCopied={semanticColor.isCopied}
      on:click={copyText}
    >
      tailwind.config.js
    </CodeArea>
    <CodeArea
      colorData={primitiveColor.data}
      isCopied={primitiveColor.isCopied}
      on:click={copyText}
    >
      main.css
    </CodeArea>
  </div>
</div>
