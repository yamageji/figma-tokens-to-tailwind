<script lang="ts">
  import { onMount } from 'svelte';
  import Button from './Button.svelte';
  import CodeArea from './CodeArea.svelte';
  import CheckItem from './CheckItem.svelte';
  import IconArrowPath from './icons/IconArrowPath.svelte';

  let primitiveColorData: string;
  let semanticColorData: string;
  let textData: string;

  let prefix = '';
  let hasPrimitive = false;
  let classifyByKeys = false;

  let isCopiedSemantic = false;
  let isCopiedPrimitive = false;

  const generateTokens = () => {
    isCopiedSemantic = false;
    isCopiedPrimitive = false;

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
      event.target.id === 'semantic' ? semanticColorData : primitiveColorData;

    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();
    document.execCommand('copy');

    if (event.target.id === 'semantic' && isCopiedSemantic === false) {
      isCopiedSemantic = true;
      setTimeout(() => {
        isCopiedSemantic = false;
      }, 2000);
    } else if (event.target.id === 'primitive' && isCopiedPrimitive === false) {
      isCopiedPrimitive = true;
      setTimeout(() => {
        isCopiedPrimitive = false;
      }, 2000);
    }
  };

  onmessage = (event) => {
    semanticColorData = event.data.pluginMessage.semanticColorData;
    primitiveColorData = event.data.pluginMessage.primitiveColorData;
    textData = event.data.pluginMessage.textData;
  };

  onMount(() => generateTokens());
</script>

<div class="m-4 flex gap-8">
  <div class="w-[200px] flex-shrink-0">
    <h2 class="text-lg font-bold">Settings</h2>
    <div class="mt-2 flex flex-col gap-1">
      <CheckItem checked={hasPrimitive}>Primitive styles</CheckItem>

      <label class="flex w-fit items-center gap-2">
        prefix:
        <input
          type="text"
          bind:value={prefix}
          placeholder="primitive"
          class="w-full rounded-sm border border-slate-500 px-1 py-0.5"
        />
      </label>

      <CheckItem checked={classifyByKeys}>Classify by keys</CheckItem>
    </div>

    <Button on:click={generateTokens}>
      generate
      <IconArrowPath />
    </Button>
  </div>

  <div class="flex flex-grow gap-6">
    <CodeArea
      colorData={semanticColorData}
      isCopied={isCopiedSemantic}
      on:click={copyText}
    >
      tailwind.config.js
    </CodeArea>
    <CodeArea
      colorData={primitiveColorData}
      isCopied={isCopiedPrimitive}
      on:click={copyText}
    >
      main.css
    </CodeArea>
  </div>
</div>
